# AutoFlowGP — motion design

Vidéos animées pour les réseaux, produites avec **Remotion** (vidéo en React) et **Three.js** (3D).
Ce dossier est indépendant du site : il a ses propres dépendances et n'est pas publié par Netlify.

## Signature « Nacre »

Un flux de particules en spirale arrive de la profondeur, trace le mot **AutoFlowGP** lettre après lettre,
puis le mot devient du verre nacré sur fond perle. Il rebondit, la caméra prend du recul, puis avance lentement
pendant qu'un reflet glisse sur les lettres.

| Fichier | Format | Usage |
|---|---|---|
| `out/autoflowgp-signature-nacre-16x9.mp4` | 1920 × 1080, 60 i/s, 12 s | LinkedIn, YouTube, site |
| `out/autoflowgp-signature-nacre-9x16.mp4` | 1080 × 1920, 60 i/s, 12 s | Reels, TikTok, Shorts, stories |

### Chronologie (12 s)

| Temps | Moment |
|---|---|
| 0 – 2 s | Le flux arrive, la caméra voyage dans le courant |
| 2 – 6,2 s | Construction : chaque lettre est déposée, de gauche à droite |
| 6,2 – 6,9 s | Les particules deviennent verre, une ligne de lumière balaie le mot |
| 6,9 – 8 s | Impact : le mot rebondit, la caméra recule en douceur |
| 8 – 12 s | Signature : lente avancée, reflet, « autoflowgp.com » |

## Commandes

```bash
npm install
npm run studio      # aperçu interactif dans le navigateur
npm run audio       # régénère la bande-son (public/audio/signature-nacre.wav)
npm run render      # bande-son + les deux vidéos dans out/
```

Sur un serveur sans carte graphique, ajouter `--gl=swangle` aux commandes `remotion render`.

## Organisation

- `src/scene/timeline.js` : la chronologie (flux, caméra, rebond). Partagée entre l'image et le son.
- `src/scene/engine.js` : la scène 3D (masque du mot, verre nacré, particules, chemins).
- `src/Signature.jsx` : la composition Remotion (scène + adresse + fondu + son).
- `scripts/render-audio.mjs` : la bande-son, synthétisée hors ligne avec Web Audio.

## Réutiliser pour un autre projet

1. Changer le mot (`TXT` dans `engine.js`) et la police (`@fontsource/...`).
2. Changer la matière et le fond (objet `NACRE` dans `engine.js`).
3. Ajuster le rythme dans `timeline.js` (`headL`, `TB`, `D`).
4. `npm run render`.
