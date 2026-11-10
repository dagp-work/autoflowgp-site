// Chronologie partagée entre l'image (engine.js) et le son (scripts/render-audio.mjs).
// Tout dépend uniquement du temps t (en secondes) : indispensable pour un rendu image par image.

export const D = 12; // durée totale (s)
export const TB = 6.9; // instant du rebond (impact)
export const NL = 10; // nombre de lettres dans « AutoFlowGP »

// Montages : temps vidéo τ → temps de scène t = start + τ × speed
export const FULL = { duration: 12, start: 0, speed: 1, fadeIn: 0.45, audio: 'audio/signature-nacre.wav' };
export const SHORT = { duration: 6, start: 2.4, speed: 1.25, fadeIn: 0.3, audio: 'audio/signature-nacre-6s.wav' };

export const cl = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const sm = (a, b, v) => {
  const x = cl((v - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
};
export const eo = (t) => 1 - Math.pow(1 - t, 3);
export const eis = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

// Avancée de la tête du flux sur le chemin de la lettre L (0 → 1,6 ; 1 = lettre atteinte)
export const headL = (t, L) => 1.6 * eis(cl((t - (0.4 + L * 0.25)) / 3.4, 0, 1));

// Réglages du flux « Spirale »
export const LAG = 0.3; // étalement des particules derrière la tête
export const QK = 0.22; // durée (en unités de chemin) du dépôt sur la lettre

// Instant où 82 % des particules de la lettre L sont posées
const H82 = 1 + QK + LAG * 0.82;
const X82 = Math.acos(1 - 2 * (H82 / 1.6)) / Math.PI;
export const settleTime = (L) => 0.4 + L * 0.25 + X82 * 3.4;

// Front de matérialisation (0 → 1 de gauche à droite), lissé et déterministe
export function frontAt(t, bound) {
  let f = 0;
  for (let L = 0; L < NL; L++) {
    const w = bound[L] - (L ? bound[L - 1] : 0);
    const ts = settleTime(L);
    f += w * sm(ts, ts + 0.45, t);
  }
  if (t > 6.85) f = Math.max(f, sm(6.7, 6.9, t));
  return f;
}

// Part des particules en vol (sert à piloter le souffle et le filtre du son)
export function flowAt(t) {
  let s = 0;
  for (let L = 0; L < NL; L++) {
    const h = headL(t, L);
    s += cl(h / LAG, 0, 1) - cl((h - 1 - QK) / LAG, 0, 1);
  }
  return s / NL;
}

// Rebond du mot : légère anticipation puis ressort amorti
export const wordScale = (t) => {
  const x = t - TB;
  return x < 0 ? 1 - 0.035 * sm(6.45, TB, t) : 1 + 0.075 * Math.exp(-4.2 * x) * Math.sin(12.5 * x);
};

export const TRUNK = [
  [2.5, -2, 64],
  [-3.5, 1.4, 50],
  [3, -0.8, 37],
  [-2, 1, 25],
  [1, -0.2, 14],
  [0, 0.2, 6],
];

// Caméra « Immersion » : on voyage dans le courant puis on en sort face au mot.
// Trajectoire lissée par une moyenne gaussienne de ±0,7 s pour supprimer les à-coups.
export function makeCamera(THREE, getFit) {
  const river = new THREE.CatmullRomCurve3(
    TRUNK.map((p) => new THREE.Vector3(...p)),
    false,
    'centripetal'
  );
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();

  function endPose(t) {
    let dm;
    if (t < TB) dm = 1.12;
    else if (t < 8) dm = lerp(1.12, 1.32, eis((t - TB) / 1.1));
    else dm = lerp(1.32, 0.94, eis(cl((t - 8) / 3.3, 0, 1)));
    const ang = 0.16 - 0.3 * eis(cl((t - 5) / 7, 0, 1));
    const d = getFit() * dm;
    return [[Math.sin(ang) * d, 0.35 + 0.25 * dm, Math.cos(ang) * d], [0, 0, 0]];
  }

  function rawPose(t) {
    const u = cl(Math.min(headL(t, 2), 1) * 0.9 - 0.05 + 0.04 * sm(0, 1, t), 0, 0.97);
    river.getPointAt(u, a);
    river.getPointAt(Math.min(u + 0.12, 1), b);
    const k = sm(0.6, 0.97, u);
    return [[a.x + 0.2, a.y + 0.6, a.z], [lerp(b.x, 0, k), lerp(b.y, 0, k), lerp(b.z, 0, k)]];
  }

  function poseAt(t) {
    t = cl(t, 0, D);
    const r = rawPose(t);
    const e = endPose(t);
    const bl = eis(cl((t - 4.8) / (TB + 0.3 - 4.8), 0, 1));
    const p = [0, 1, 2].map((i) => lerp(r[0][i], e[0][i], bl));
    const l = [0, 1, 2].map((i) => lerp(r[1][i], e[1][i], bl));
    const dx = l[0] - p[0], dy = l[1] - p[1], dz = l[2] - p[2];
    const n = Math.hypot(dx, dy, dz) || 1;
    return [p, [dx / n, dy / n, dz / n]];
  }

  const OFF = [-0.7, -0.525, -0.35, -0.175, 0, 0.175, 0.35, 0.525, 0.7];
  const WT = OFF.map((o) => Math.exp((-o * o) / (2 * 0.3 * 0.3)));

  function smoothPose(t) {
    const P = [0, 0, 0], L = [0, 0, 0];
    let ws = 0;
    OFF.forEach((o, j) => {
      const q = poseAt(t + o), w = WT[j];
      ws += w;
      for (let i = 0; i < 3; i++) {
        P[i] += q[0][i] * w;
        L[i] += q[1][i] * w;
      }
    });
    const n = Math.hypot(...L) || 1;
    return { pos: P.map((v) => v / ws), dir: L.map((v) => v / n) };
  }

  return { river, smoothPose };
}

// Distance caméra qui fait tenir le mot dans la largeur de l'image
export function fitDistance(wordW, aspect, fovDeg = 40) {
  const hf = 2 * Math.atan(Math.tan((fovDeg * Math.PI) / 360) * aspect);
  const margin = aspect < 1 ? 0.55 : 0.62; // en vertical, le mot remplit davantage la largeur
  return (wordW * margin) / Math.tan(hf / 2);
}

// Petit générateur pseudo-aléatoire à graine : le même rendu à chaque fois
export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
