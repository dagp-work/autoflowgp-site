import { Config } from '@remotion/cli/config';

// Rendu WebGL : « angle » utilise la carte graphique de la machine.
// Sur un serveur sans GPU, passer --gl=swangle en ligne de commande.
Config.setChromiumOpenGlRenderer('angle');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(16);
