# AutoflowGP

Site officiel d'AutoflowGP, construit avec [Eleventy](https://www.11ty.dev/) et [Tailwind CSS](https://tailwindcss.com/), déployé sur [Netlify](https://www.netlify.com/).

## Stack

- **Eleventy (11ty)** — générateur de site statique, config dans `.eleventy.js`
- **Tailwind CSS** — styles, source dans `src/styles/tailwind.css`
- **Alpine.js** — interactions front-end légères
- **Netlify** — hébergement et déploiement continu

## Structure

```
src/       # pages, layouts, données et styles source
public/    # fichiers statiques copiés tels quels (images, CSS compilé)
_site/     # sortie du build (généré, non versionné)
```

## Développement local

```bash
npm install
npm run dev
```

Lance en parallèle le build Tailwind en mode watch et le serveur de dev Eleventy.

## Build de production

```bash
npm run build
```

Génère le site dans `_site/`, publié automatiquement par Netlify à chaque push sur `main`.
