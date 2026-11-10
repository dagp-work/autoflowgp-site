// Génère la bande-son de la signature (public/audio/signature-nacre.wav).
// Le son est synthétisé avec Web Audio dans un OfflineAudioContext (même moteur que le prototype),
// piloté par la même chronologie que l'image : souffle et nappe qui suivent le flux,
// montée de tension, notes cristallines par lettre posée, aspiration + impact au rebond, scintillement.
import { writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { TB, NL, cl, sm, flowAt, settleTime, makeCamera, fitDistance, FULL, SHORT } from '../src/scene/timeline.js';

const require = createRequire(import.meta.url);
const THREE = require('three');
const here = dirname(fileURLToPath(import.meta.url));
/* Courbes de pilotage, 60 points par seconde, exprimées en temps vidéo τ */
const RATE = 60;
const fit = fitDistance(11.9, 16 / 9);
const camera = makeCamera(THREE, () => fit);
function plan(cut) {
  const curve = [];
  let prev = camera.smoothPose(cut.start).pos;
  for (let i = 0; i <= cut.duration * RATE; i++) {
    const tau = i / RATE, t = cut.start + tau * cut.speed;
    const { pos } = camera.smoothPose(t);
    const speed = Math.hypot(pos[0] - prev[0], pos[1] - prev[1], pos[2] - prev[2]) * RATE;
    prev = pos;
    const intensity = Math.min(1, flowAt(t) * 1.3 + (1 - sm(5.5, 7, t)) * 0.25 + Math.min(speed / 40, 0.3));
    curve.push([tau, intensity, cl(pos[0] / 8, -0.8, 0.8), t]);
  }
  const at = (t) => (t - cut.start) / cut.speed;
  const ticks = [...Array(NL)].map((_, L) => at(settleTime(L)));
  return { curve, events: { ticks, swell: at(TB - 0.6), impact: at(TB), sheen: at(7.8), D: cut.duration, tauTB: at(TB) } };
}

const synth = async ({ curve, events }) => {
  const SR = 48000, ac = new OfflineAudioContext(2, Math.ceil(events.D * SR), SR);
  const sm = (a, b, v) => { const x = Math.min(1, Math.max(0, (v - a) / (b - a))); return x * x * (3 - 2 * x); };
  const comp = ac.createDynamicsCompressor(); comp.threshold.value = -16; comp.ratio.value = 3;
  const outG = ac.createGain(); outG.gain.value = 0.9; outG.connect(comp).connect(ac.destination);
  const rl = Math.floor(SR * 3.4), ir = ac.createBuffer(2, rl, SR);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < rl; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 2.8); }
  const rev = ac.createConvolver(); rev.buffer = ir; const revIn = ac.createGain(); revIn.gain.value = 0.5; revIn.connect(rev).connect(outG);
  const dl = ac.createDelay(1); dl.delayTime.value = 0.29; const fb = ac.createGain(); fb.gain.value = 0.42; const dlf = ac.createBiquadFilter(); dlf.type = 'lowpass'; dlf.frequency.value = 3500;
  dl.connect(dlf).connect(fb).connect(dl); dlf.connect(revIn); dlf.connect(outG); const dlIn = ac.createGain(); dlIn.gain.value = 0.35; dlIn.connect(dl);
  const len = SR * 3, nb = ac.createBuffer(1, len, SR), nd = nb.getChannelData(0); for (let i = 0; i < len; i++) nd[i] = Math.random() * 2 - 1;

  const pan = ac.createStereoPanner(), bed = ac.createGain(); bed.connect(pan); pan.connect(outG); pan.connect(revIn);
  const ns = ac.createBufferSource(); ns.buffer = nb; ns.loop = true; const bp = ac.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 3;
  const wg = ac.createGain(); wg.gain.value = 0; ns.connect(bp).connect(wg).connect(bed); ns.start(0);
  const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.Q.value = 9; lp.frequency.value = 300; const pg = ac.createGain(); pg.gain.value = 0;
  [[55, 0.2], [55.35, 0.2], [82.6, 0.14], [110.4, 0.1], [164.9, 0.05]].forEach(([f, v]) => { const o = ac.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const g = ac.createGain(); g.gain.value = v; o.connect(g).connect(lp); o.start(0); });
  const lfo = ac.createOscillator(); lfo.frequency.value = 0.21; const lg = ac.createGain(); lg.gain.value = 220; lfo.connect(lg).connect(lp.frequency); lfo.start(0);
  lp.connect(pg).connect(bed);
  const ro = [ac.createOscillator(), ac.createOscillator()], rg = ac.createGain(); rg.gain.value = 0;
  ro.forEach((o, i) => { o.type = i ? 'triangle' : 'sine'; o.frequency.value = 170 * (1 + i * 0.007); o.connect(rg); o.start(0); });
  rg.connect(outG); rg.connect(dlIn);

  for (const [tau, I, p, ts] of curve) {
    const t = tau;
    wg.gain.setTargetAtTime(0.32 * I, t, 0.15);
    bp.frequency.setTargetAtTime(350 + 3000 * I, t, 0.2);
    pg.gain.setTargetAtTime((0.05 + 0.07 * I) * (1 - sm(events.D - 1.2, events.D - 0.2, t)) * sm(0, 0.6, t), t, 0.3);
    lp.frequency.setTargetAtTime(260 + 2200 * I, t, 0.25);
    const r = t < events.tauTB ? sm(0.8, 6.8, ts) : 0;
    rg.gain.setTargetAtTime(0.03 * r, t, t < events.tauTB ? 0.2 : 0.03);
    ro.forEach((o, i) => o.frequency.setTargetAtTime((170 + 620 * r * r) * (1 + i * 0.007), t, 0.1));
    pan.pan.setTargetAtTime(p, t, 0.2);
  }

  const env = (node, t, a, peak, dec, dests) => { const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec); node.connect(g); (dests || [outG]).forEach((d) => g.connect(d)); };
  const ratios = [1, 9 / 8, 5 / 4, 3 / 2, 5 / 3, 2, 9 / 4, 5 / 2, 3, 10 / 3];
  events.ticks.forEach((t, L) => {
    if (t < 0) return;
    const f = 659.25 * ratios[L], c = ac.createOscillator(), m = ac.createOscillator(), mg = ac.createGain();
    c.frequency.value = f; m.frequency.value = f * 3.01; mg.gain.setValueAtTime(f * 2.2, t); mg.gain.exponentialRampToValueAtTime(1, t + 0.35); m.connect(mg).connect(c.frequency);
    const p = ac.createStereoPanner(); p.pan.value = -0.75 + 1.5 * L / 9; c.connect(p); env(p, t, 0.003, 0.05, 0.6, [outG, dlIn, revIn]);
    c.start(t); m.start(t); c.stop(t + 0.8); m.stop(t + 0.8);
  });
  { const t = events.swell, s = ac.createBufferSource(); s.buffer = nb; const f = ac.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.5; f.frequency.setValueAtTime(800, t); f.frequency.exponentialRampToValueAtTime(7000, t + 0.6);
    const g = ac.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.16, t + 0.58); g.gain.linearRampToValueAtTime(0, t + 0.62); s.connect(f).connect(g); g.connect(outG); g.connect(revIn); s.start(t); s.stop(t + 0.7); }
  { const t = events.impact, o = ac.createOscillator(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(32, t + 0.8); env(o, t, 0.004, 0.6, 0.9); o.start(t); o.stop(t + 1);
    const f = ac.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 4; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(5200, t + 0.5); f.frequency.exponentialRampToValueAtTime(700, t + 3.2);
    [130.81, 196, 261.63, 392, 493.88, 587.33].forEach((fq) => { const s = ac.createOscillator(); s.type = 'sawtooth'; s.frequency.value = fq; s.detune.value = (Math.random() - 0.5) * 14; const g = ac.createGain(); g.gain.value = 0.035; s.connect(g).connect(f); s.start(t); s.stop(t + 3.6); });
    env(f, t, 0.03, 1, 3.2, [outG, revIn]);
    [1567.98, 2349.32].forEach((fq) => { const b = ac.createOscillator(); b.frequency.value = fq; env(b, t + 0.01, 0.005, 0.025, 2.2, [outG, revIn, dlIn]); b.start(t); b.stop(t + 2.5); }); }
  { const t = events.sheen; [2093, 2637, 3136, 3951, 4186, 3951, 3136, 4699].forEach((fq, i) => { const o = ac.createOscillator(); o.frequency.value = fq; const p = ac.createStereoPanner(); p.pan.value = i % 2 ? 0.6 : -0.6; o.connect(p); env(p, t + i * 0.05, 0.004, 0.018, 0.5, [outG, dlIn, revIn]); o.start(t + i * 0.05); o.stop(t + i * 0.05 + 0.6); }); }
  // Fondu final pour une boucle propre
  outG.gain.setValueAtTime(0.9, events.D - 0.8); outG.gain.linearRampToValueAtTime(0, events.D - 0.02);

  const buf = await ac.startRendering(), L = buf.getChannelData(0), Rr = buf.getChannelData(1);
  // Mise à niveau pour les réseaux (≈ −16 dB RMS) puis limiteur doux (tanh) pour garder les impacts sans saturer
  let peak = 0, e = 0; for (let i = 0; i < L.length; i++) { peak = Math.max(peak, Math.abs(L[i]), Math.abs(Rr[i])); e += L[i] * L[i] + Rr[i] * Rr[i]; }
  const rms = Math.sqrt(e / (2 * L.length)), gain = 0.16 / rms, pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[i * 2] = Math.round(Math.tanh(L[i] * gain) * 0.94 * 32767); pcm[i * 2 + 1] = Math.round(Math.tanh(Rr[i] * gain) * 0.94 * 32767); }
  const bytes = new Uint8Array(pcm.buffer); let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return { b64: btoa(bin), SR, peak };
};

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage();
for (const cut of [FULL, SHORT]) {
  const { b64, SR, peak } = await page.evaluate(synth, plan(cut));
  const data = Buffer.from(b64, 'base64');
  const header = Buffer.alloc(44);
  header.write('RIFF', 0); header.writeUInt32LE(36 + data.length, 4); header.write('WAVE', 8);
  header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20); header.writeUInt16LE(2, 22);
  header.writeUInt32LE(SR, 24); header.writeUInt32LE(SR * 4, 28); header.writeUInt16LE(4, 32); header.writeUInt16LE(16, 34);
  header.write('data', 36); header.writeUInt32LE(data.length, 40);
  const out = resolve(here, '../public', cut.audio);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.concat([header, data]));
  console.log(`Bande-son écrite : ${out} (${(data.length / SR / 4).toFixed(2)} s, crête ${peak.toFixed(2)})`);
}
await browser.close();
