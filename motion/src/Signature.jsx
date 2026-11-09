import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AbsoluteFill, Audio, continueRender, delayRender, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import '@fontsource/onest/800.css';
import '@fontsource/ibm-plex-mono/400.css';
import { createEngine, NACRE } from './scene/engine.js';
import { sm } from './scene/timeline.js';

const rgb = (a) => `rgb(${a.map((v) => Math.round(v * 255)).join(',')})`;

export const Signature = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const canvas = useRef(null);
  const [engine, setEngine] = useState(null);
  const [handle] = useState(() => delayRender('Préparation de la scène 3D'));

  useEffect(() => {
    let alive = true;
    let e;
    (async () => {
      await Promise.all([document.fonts.load('800 460px Onest'), document.fonts.load('400 24px "IBM Plex Mono"')]);
      e = createEngine(canvas.current, { width, height });
      if (alive) {
        setEngine(e);
        continueRender(handle);
      }
    })();
    return () => {
      alive = false;
      e?.dispose();
    };
  }, [width, height, handle]);

  const t = frame / fps;
  useLayoutEffect(() => {
    if (engine) engine.renderAt(t);
  }, [engine, t]);

  const veil = Math.max(sm(11.3, 12, t), 1 - sm(0, 0.45, t));
  const sig = sm(8.6, 9.4, t) * (1 - sm(10.9, 11.4, t));
  const unit = Math.min(width, height) / 1080;

  return (
    <AbsoluteFill style={{ backgroundColor: rgb(NACRE.bgBot) }}>
      <canvas ref={canvas} width={width} height={height} style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: height > width ? '22%' : '9%', textAlign: 'center',
          fontFamily: '"IBM Plex Mono", monospace', fontSize: 22 * unit, letterSpacing: '0.32em', textTransform: 'uppercase',
          color: NACRE.ink, opacity: sig,
        }}
      >
        autoflowgp.com
      </div>
      <AbsoluteFill style={{ backgroundColor: rgb(NACRE.bgTop), opacity: veil }} />
      <Audio src={staticFile('audio/signature-nacre.wav')} />
    </AbsoluteFill>
  );
};
