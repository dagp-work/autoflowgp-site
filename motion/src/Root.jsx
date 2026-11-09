import { Composition } from 'remotion';
import { Signature } from './Signature.jsx';
import { D } from './scene/timeline.js';

const FPS = 60;

// Une composition par format : mêmes réglages, seul le cadre change.
export const RemotionRoot = () => (
  <>
    <Composition id="Signature-Nacre-16x9" component={Signature} durationInFrames={D * FPS} fps={FPS} width={1920} height={1080} />
    <Composition id="Signature-Nacre-9x16" component={Signature} durationInFrames={D * FPS} fps={FPS} width={1080} height={1920} />
  </>
);
