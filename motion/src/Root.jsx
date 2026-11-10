import { Composition } from 'remotion';
import { Signature } from './Signature.jsx';
import { D, SHORT } from './scene/timeline.js';

const FPS = 60;

// Une composition par format : mêmes réglages, seul le cadre change.
export const RemotionRoot = () => (
  <>
    <Composition id="Signature-Nacre-16x9" component={Signature} durationInFrames={D * FPS} fps={FPS} width={1920} height={1080} />
    <Composition id="Signature-Nacre-9x16" component={Signature} durationInFrames={D * FPS} fps={FPS} width={1080} height={1920} />
    {/* Version courte 6 s : on entre dans le flux à son approche du mot, action ×1,25 */}
    <Composition id="Signature-Nacre-6s-16x9" component={Signature} durationInFrames={SHORT.duration * FPS} fps={FPS} width={1920} height={1080} defaultProps={SHORT} />
    <Composition id="Signature-Nacre-6s-9x16" component={Signature} durationInFrames={SHORT.duration * FPS} fps={FPS} width={1080} height={1920} defaultProps={SHORT} />
  </>
);
