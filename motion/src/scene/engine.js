// Scène 3D « Signature Nacre » : un flux en spirale trace le mot AutoFlowGP,
// qui devient du verre nacré sur un fond perle. Rendu déterministe : renderAt(t).
import * as THREE from 'three';
import {
  NL, TB, LAG, QK, cl, lerp, sm, eo, eis, headL, frontAt, wordScale,
  makeCamera, fitDistance, rng, TRUNK,
} from './timeline.js';

export const NACRE = {
  bgTop: [0.965, 0.965, 0.975],
  bgBot: [0.85, 0.86, 0.89],
  pools: [[0.86, 0.84, 0.97], [0.8, 0.94, 0.91], [0.99, 0.88, 0.84]],
  pk: 0.6,
  iri: 0.95,
  shadow: 0.2,
  gtint: [0.7, 0.76, 0.9],
  part: [0.42, 0.47, 0.6],
  ink: '#2A2D36',
};

const TXT = 'AutoFlowGP';
// Masque en haute définition : arêtes nettes même en 4K
const W = 3000, H = 640, S = 1 / 210;

function boxBlur(src, r) {
  const tmp = new Float32Array(W * H), out = new Float32Array(W * H);
  for (let y = 0; y < H; y++) {
    let s = 0;
    for (let x = -r; x <= r; x++) s += src[y * W + cl(x, 0, W - 1)];
    for (let x = 0; x < W; x++) {
      tmp[y * W + x] = s / (2 * r + 1);
      s += src[y * W + cl(x + r + 1, 0, W - 1)] - src[y * W + cl(x - r, 0, W - 1)];
    }
  }
  for (let x = 0; x < W; x++) {
    let s = 0;
    for (let y = -r; y <= r; y++) s += tmp[cl(y, 0, H - 1) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = s / (2 * r + 1);
      s += tmp[cl(y + r + 1, 0, H - 1) * W + x] - tmp[cl(y - r, 0, H - 1) * W + x];
    }
  }
  return out;
}

const BGFN = `uniform vec3 uBgTop,uBgBot,uP1,uP2,uP3;uniform float uPK,uTime;uniform vec2 uRes;
vec3 bgc(vec2 uv){float asp=uRes.x/uRes.y;vec2 p=vec2((uv.x-.5)*asp,uv.y-.5);
 vec3 c=mix(uBgBot,uBgTop,smoothstep(-.1,1.1,uv.y));
 vec2 a=vec2(-.32*asp+.07*sin(uTime*.11),.16+.05*cos(uTime*.13)),b=vec2(.3*asp+.06*cos(uTime*.09),-.14+.04*sin(uTime*.1)),d=vec2(.04*asp,.3+.04*sin(uTime*.07));
 c=mix(c,uP1,uPK*exp(-dot(p-a,p-a)*4.5));c=mix(c,uP2,uPK*exp(-dot(p-b,p-b)*4.));c=mix(c,uP3,uPK*.8*exp(-dot(p-d,p-d)*6.));
 return c*(1.-.16*dot(p,p));}`;

export function createEngine(canvas, { width, height, seed = 20261109 }) {
  const R = rng(seed);
  const M = NACRE;

  /* ---------- Le mot : masque, relief et points ---------- */
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const g = cv.getContext('2d');
  g.font = '800 460px Onest, "Helvetica Neue", Arial, sans-serif';
  g.textBaseline = 'middle';
  g.fillStyle = '#fff';
  const total = g.measureText(TXT).width, x0 = W / 2 - total / 2;
  g.fillText(TXT, x0, H / 2 + 16);
  const cum = [];
  for (let i = 0; i <= TXT.length; i++) cum.push(x0 + g.measureText(TXT.slice(0, i)).width);
  const img = g.getImageData(0, 0, W, H).data, A = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) A[i] = img[i * 4 + 3] / 255;
  const Bl = boxBlur(boxBlur(A, 6), 6), Bs = boxBlur(boxBlur(boxBlur(A, 18), 18), 18);
  const tex = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const s = y * W + x, d = ((H - 1 - y) * W + x) * 4;
    tex[d] = A[s] * 255; tex[d + 1] = Bl[s] * 255; tex[d + 2] = Bs[s] * 255; tex[d + 3] = 255;
  }
  const mask = new THREE.DataTexture(tex, W, H, THREE.RGBAFormat);
  mask.magFilter = mask.minFilter = THREE.LinearFilter;
  mask.needsUpdate = true;

  let minX = W, maxX = 0;
  const raw = [];
  for (let y = 0; y < H; y += 10) for (let x = 0; x < W; x += 10) if (A[y * W + x] > 0.55) {
    raw.push([x, y]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
  }
  const letterOf = (x) => { let i = 0; while (i < NL - 1 && x >= cum[i + 1]) i++; return i; };
  const bound = [];
  for (let i = 0; i < NL; i++) bound.push(cl((cum[i + 1] - minX) / (maxX - minX), 0, 1));
  const cen = [...Array(NL)].map(() => [0, 0, 0]);
  for (const [x, y] of raw) { const L = letterOf(x); cen[L][0] += (x - W / 2) * S; cen[L][1] += -(y - H / 2) * S; cen[L][2]++; }
  const C = cen.map((c) => new THREE.Vector3(c[0] / c[2], c[1] / c[2], 0));
  const wordW = (maxX - minX) * S;

  /* ---------- Rendu ---------- */
  const ren = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  ren.setPixelRatio(1);
  ren.setSize(width, height, false);
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, width / height, 0.05, 400);
  const word = new THREE.Group();
  scene.add(word);
  const PX = height / 600; // échelle des points : même rendu quelle que soit la définition
  const fit = fitDistance(wordW, width / height);
  const camera = makeCamera(THREE, () => fit);

  const col = (a) => new THREE.Color().setRGB(...a);
  const BGU = {
    uBgTop: { value: col(M.bgTop) }, uBgBot: { value: col(M.bgBot) },
    uP1: { value: col(M.pools[0]) }, uP2: { value: col(M.pools[1]) }, uP3: { value: col(M.pools[2]) },
    uPK: { value: M.pk }, uTime: { value: 0 }, uRes: { value: new THREE.Vector2(width, height) },
  };
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    depthWrite: false, depthTest: false, uniforms: BGU,
    vertexShader: `void main(){gl_Position=vec4(position.xy,.9999,1.);}`,
    fragmentShader: BGFN + `void main(){gl_FragColor=vec4(bgc(gl_FragCoord.xy/uRes),1.);}`,
  }));
  bgMesh.frustumCulled = false;
  bgMesh.renderOrder = -10;
  scene.add(bgMesh);

  /* Lettres en verre nacré : relief issu du masque, réfraction du fond, irisation, arêtes sombres */
  const letterMat = new THREE.ShaderMaterial({
    uniforms: {
      uMask: { value: mask }, uTexel: { value: new THREE.Vector2(1 / W, 1 / H) }, uWS: { value: new THREE.Vector2(W * S, H * S) },
      uDepth: { value: 0.42 }, uFront: { value: 0 }, uX0: { value: minX / W }, uX1: { value: maxX / W },
      uSweep: { value: -2 }, uGlow: { value: 1 }, uIri: { value: M.iri }, uGTint: { value: col(M.gtint) }, ...BGU,
    },
    vertexShader: `uniform sampler2D uMask;uniform float uDepth;varying vec2 vUv;varying vec3 vW;
 void main(){vUv=uv;float b=texture2D(uMask,uv).g;vec3 p=position+vec3(0.,0.,uDepth*smoothstep(.3,.95,b));vec4 w=modelMatrix*vec4(p,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}`,
    fragmentShader: BGFN + `uniform sampler2D uMask;uniform vec2 uTexel,uWS;uniform float uDepth,uFront,uX0,uX1,uSweep,uGlow,uIri;uniform vec3 uGTint;varying vec2 vUv;varying vec3 vW;
 float h(vec2 u){return uDepth*smoothstep(.3,.95,texture2D(uMask,u).g);}
 void main(){
  float b=texture2D(uMask,vUv).g;if(b<.3)discard;
  float nx=(vUv.x-uX0)/(uX1-uX0);
  float n=fract(sin(dot(floor(vUv*vec2(260.,56.)),vec2(12.9898,78.233)))*43758.5453);
  if(nx+n*.045>uFront)discard;
  vec2 e=uTexel*1.5;
  vec3 N=normalize(vec3((h(vUv-vec2(e.x,0.))-h(vUv+vec2(e.x,0.)))/(2.*e.x*uWS.x),(h(vUv-vec2(0.,e.y))-h(vUv+vec2(0.,e.y)))/(2.*e.y*uWS.y),1.));
  vec3 V=normalize(cameraPosition-vW),R=reflect(-V,N);
  float ang=atan(R.x,R.z);
  float th=h(vUv)/uDepth,fz=1.-max(dot(N,V),0.);
  vec3 body=bgc(gl_FragCoord.xy/uRes+N.xy*(.03+.06*th))*mix(vec3(1.),uGTint,.05+.2*th)*(1.-.05*th);
  vec3 iri=.5+.5*cos(6.2831*(fz*1.4+th*.55+R.y*.35+vec3(0.,.33,.67)));
  iri=mix(vec3(dot(iri,vec3(.333))),iri,.6);
  float st=exp(-pow((R.y-.42)*5.,2.))*.7+exp(-pow((ang-uSweep)*3.2,2.))*smoothstep(-.5,.4,R.y)*1.1+exp(-pow((ang+1.1)*5.,2.))*.28;
  vec3 col=body+(iri-.5)*uIri*(.12+.75*pow(fz,1.4))+vec3(st)*(.3+.7*fz);
  col*=1.-.5*smoothstep(.85,.2,N.z);
  col+=vec3(pow(fz,5.))*.55;
  col+=vec3(1.)*smoothstep(.05,0.,abs(nx-uFront))*uGlow*1.4;
  gl_FragColor=vec4(col,1.);}`,
  });
  word.add(new THREE.Mesh(new THREE.PlaneGeometry(W * S, H * S, 1500, 320), letterMat));

  /* Ombre douce sous le mot */
  const shadowMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uMask: { value: mask }, uK: { value: M.shadow }, uFront: letterMat.uniforms.uFront, uX0: letterMat.uniforms.uX0, uX1: letterMat.uniforms.uX1 },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform sampler2D uMask;uniform float uK,uFront,uX0,uX1;varying vec2 vUv;void main(){float nx=(vUv.x-uX0)/(uX1-uX0);float a=texture2D(uMask,vUv).b*uK*smoothstep(uFront+.06,uFront-.06,nx);gl_FragColor=vec4(.12,.14,.2,a);}`,
  });
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(W * S * 1.04, H * S * 1.15), shadowMat);
  shadow.position.set(0.18, -0.28, -0.7);
  shadow.renderOrder = -1;
  word.add(shadow);

  /* Particules */
  const ptMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.NormalBlending,
    uniforms: { uCol: { value: col(M.part) }, uPX: { value: PX } },
    vertexShader: `attribute float aA,aS;uniform float uPX;varying float vA;
 void main(){vec4 mv=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mv;float z=-mv.z;gl_PointSize=min(aS*uPX*(9./z),30.*uPX);vA=aA*smoothstep(.15,1.6,z);}`,
    fragmentShader: `uniform vec3 uCol;varying float vA;
 void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=(smoothstep(.5,0.,d)*.65+smoothstep(.16,0.,d)*.7)*vA;gl_FragColor=vec4(uCol,a*.7);}`,
  });

  /* Chemins : un par lettre, partageant le même tronc */
  const K = 360;
  const paths = [], tubes = [];
  for (let L = 0; L < NL; L++) {
    const p = TRUNK.map((v, i) => new THREE.Vector3(...v).add(new THREE.Vector3(i > 3 ? C[L].x * 0.12 * (i - 3) : 0, 0, 0)));
    p.push(new THREE.Vector3(C[L].x * 0.6, C[L].y * 0.5, 2.2));
    p.push(new THREE.Vector3(C[L].x, C[L].y, 0.15));
    const c = new THREE.CatmullRomCurve3(p, false, 'centripetal');
    const f = c.computeFrenetFrames(K - 1, false);
    const pos = new Float32Array(K * 3), nor = new Float32Array(K * 3), bin = new Float32Array(K * 3);
    for (let i = 0; i < K; i++) {
      const q = c.getPointAt(i / (K - 1));
      pos.set([q.x, q.y, q.z], i * 3);
      nor.set([f.normals[i].x, f.normals[i].y, f.normals[i].z], i * 3);
      bin.set([f.binormals[i].x, f.binormals[i].y, f.binormals[i].z], i * 3);
    }
    paths.push({ k: K, pos, nor, bin });
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { uHead: { value: 0 }, uFade: { value: 1 }, uCol: { value: col(M.part) } },
      vertexShader: `varying vec2 vUv;varying float vZ;void main(){vUv=uv;vec4 mv=modelViewMatrix*vec4(position,1.);vZ=-mv.z;gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `uniform float uHead,uFade;uniform vec3 uCol;varying vec2 vUv;varying float vZ;
 void main(){if(vUv.x>uHead)discard;float a=(.14+.86*smoothstep(uHead-.18,uHead,vUv.x))*uFade*.6*smoothstep(.6,4.,vZ);gl_FragColor=vec4(uCol,a);}`,
    });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(c, K * 2, 0.009, 6, false), m);
    scene.add(tube);
    tubes.push(tube);
  }

  /* Particules du mot (2 couches) + particules d'ambiance du courant */
  const N = raw.length * 2, NA = 3800, T = N + NA;
  const P = {
    t: new Float32Array(N * 3), L: new Uint8Array(N), nx: new Float32Array(N),
    r: new Float32Array(T), a: new Float32Array(T), rad: new Float32Array(T), pi: new Uint8Array(T), sp: new Float32Array(T),
  };
  let k = 0;
  for (let l = 0; l < 2; l++) for (const [x, y] of raw) {
    const L = letterOf(x);
    P.t.set([(x - W / 2) * S + (R() - 0.5) * 0.03, -(y - H / 2) * S + (R() - 0.5) * 0.03, 0.05 + l * 0.3], k * 3);
    P.L[k] = L; P.nx[k] = (x - minX) / (maxX - minX);
    P.r[k] = R(); P.a[k] = R() * 6.283; P.rad[k] = 0.25 + R() * 0.75; P.pi[k] = L;
    k++;
  }
  for (let i = N; i < T; i++) { P.r[i] = R(); P.a[i] = R() * 6.283; P.rad[i] = 0.6 + R() * 2.2; P.pi[i] = Math.floor(R() * NL); P.sp[i] = 0.05 + R() * 0.07; }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(T * 3), 3).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aA', new THREE.BufferAttribute(new Float32Array(T), 1).setUsage(THREE.DynamicDrawUsage));
  geo.setAttribute('aS', new THREE.BufferAttribute(new Float32Array(T), 1).setUsage(THREE.DynamicDrawUsage));
  const pts = new THREE.Points(geo, ptMat);
  pts.frustumCulled = false;
  word.add(pts);

  const v3 = [0, 0, 0];
  function sample(pa, s) {
    const f = cl(s, 0, 1) * (pa.k - 1), i = Math.min(pa.k - 2, Math.floor(f)), u = f - i, a = i * 3, b = a + 3;
    v3[0] = lerp(pa.pos[a], pa.pos[b], u); v3[1] = lerp(pa.pos[a + 1], pa.pos[b + 1], u); v3[2] = lerp(pa.pos[a + 2], pa.pos[b + 2], u);
    return a;
  }
  // Flux « Spirale » : les particules tournent autour du chemin
  function offset(pa, a, s, ang, rad, t, mul) {
    const th = ang + s * 46 + t * 1.6, n = Math.cos(th) * rad * 0.55 * mul, bb = Math.sin(th) * rad * 0.55 * mul;
    return [pa.nor[a] * n + pa.bin[a] * bb, pa.nor[a + 1] * n + pa.bin[a + 1] * bb, pa.nor[a + 2] * n + pa.bin[a + 2] * bb];
  }

  function updateParticles(t, front) {
    const pos = geo.attributes.position.array, al = geo.attributes.aA.array, sz = geo.attributes.aS.array;
    for (let i = 0; i < N; i++) {
      const L = P.L[i], pa = paths[P.pi[i]], sr = headL(t, L) - P.r[i] * LAG;
      if (sr <= 0) { al[i] = 0; pos[i * 3] = pa.pos[0]; pos[i * 3 + 1] = pa.pos[1]; pos[i * 3 + 2] = pa.pos[2]; continue; }
      const s = Math.min(sr, 1), q = cl((sr - 1) / QK, 0, 1), a = sample(pa, s);
      const o = offset(pa, a, s, P.a[i], P.rad[i], t, 1 - 0.5 * sm(0.8, 1, s)), e = eo(q);
      pos[i * 3] = lerp(v3[0] + o[0], P.t[i * 3], e);
      pos[i * 3 + 1] = lerp(v3[1] + o[1], P.t[i * 3 + 1], e);
      pos[i * 3 + 2] = lerp(v3[2] + o[2], P.t[i * 3 + 2], e);
      al[i] = (0.5 + 0.5 * e) * cl(1 - (front - P.nx[i]) * 16, 0, 1);
      sz[i] = q < 1 ? 4.6 : 3.2;
    }
    const fade = 1 - sm(6.4, 7.4, t);
    for (let i = N; i < T; i++) {
      const pa = paths[P.pi[i]], h = Math.min(headL(t, P.pi[i]), 1);
      const s = ((P.r[i] + t * P.sp[i]) % 1) * h, a = sample(pa, s), o = offset(pa, a, s, P.a[i], P.rad[i], t, 1.9);
      pos[i * 3] = v3[0] + o[0]; pos[i * 3 + 1] = v3[1] + o[1]; pos[i * 3 + 2] = v3[2] + o[2];
      al[i] = h > 0 ? 0.5 * fade * sm(0, 0.06, s) * (1 - sm(0.9 * h, h, s) * 0.7) : 0;
      sz[i] = 3.6;
    }
    geo.attributes.position.needsUpdate = geo.attributes.aA.needsUpdate = geo.attributes.aS.needsUpdate = true;
    tubes.forEach((tb, i) => { tb.material.uniforms.uHead.value = Math.min(headL(t, i), 1); tb.material.uniforms.uFade.value = fade; });
  }

  function renderAt(t) {
    const front = frontAt(t, bound);
    updateParticles(t, front);
    letterMat.uniforms.uFront.value = front * 1.05;
    letterMat.uniforms.uSweep.value = lerp(-2.1, 2.1, eis(cl((t - 7.7) / 2.8, 0, 1)));
    letterMat.uniforms.uGlow.value = 1 - sm(6.9, 7.3, t);
    BGU.uTime.value = t;
    word.scale.setScalar(wordScale(t));
    const { pos, dir } = camera.smoothPose(t);
    cam.position.set(...pos);
    cam.lookAt(pos[0] + dir[0] * 5, pos[1] + dir[1] * 5, pos[2] + dir[2] * 5);
    ren.render(scene, cam);
  }

  return { renderAt, fit, dispose: () => ren.dispose() };
}
