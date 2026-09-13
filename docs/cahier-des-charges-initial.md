# AutoFlowGP – Site vitrine/blog (Option C)
# Stack: Eleventy (11ty) + Tailwind CSS (CLI) + Alpine.js

## 0) Structure de projet

```
autoflowgp-site/
├─ package.json
├─ .eleventy.js
├─ tailwind.config.js
├─ netlify.toml
├─ public/
│  └─ assets/
│     └─ (généré) main.css
├─ src/
│  ├─ styles/
│  │  └─ tailwind.css
│  ├─ _data/
│  │  └─ site.json
│  ├─ _includes/
│  │  ├─ layouts/
│  │  │  └─ base.njk
│  │  └─ components/
│  │     └─ pricing.njk
│  ├─ index.njk
│  ├─ services.njk
│  ├─ about.njk
│  ├─ contact.njk
│  └─ blog/
│     ├─ index.njk
│     └─ posts/
│        └─ 2025-09-19-hello-world.md
└─ _site/  (build 11ty)
```

---

## 1) package.json

```json
{
  "name": "autoflowgp-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev:css": "tailwindcss -i src/styles/tailwind.css -o public/assets/main.css --watch",
    "dev:11ty": "eleventy --serve",
    "dev": "npm-run-all --parallel dev:*",
    "build:css": "tailwindcss -i src/styles/tailwind.css -o public/assets/main.css --minify",
    "build": "npm run build:css && eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0",
    "alpinejs": "^3.14.0",
    "npm-run-all": "^4.1.5",
    "tailwindcss": "^3.4.10"
  }
}
```

---

## 2) .eleventy.js

```js
module.exports = function(eleventyConfig) {
  // Dossier public en passthrough (CSS compilé, images…)
  eleventyConfig.addPassthroughCopy({ "public": "/" });

  // Collection blog (toutes les pages dans src/blog/posts)
  eleventyConfig.addCollection("posts", collectionApi =>
    collectionApi.getFilteredByGlob("src/blog/posts/*.md").sort((a,b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
```

---

## 3) tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{njk,md,html}",
    "./src/_includes/**/*.{njk,md,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "#3B82F6", // bleu tech
          700: "#2563EB"
        },
        dark: "#0F172A"
      }
    }
  },
  plugins: []
};
```

---

## 4) netlify.toml (déploiement simple)

```toml
[build]
  command = "npm run build"
  publish = "_site"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 5) src/styles/tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* utilitaires perso */
.container-xl { @apply max-w-6xl mx-auto px-4; }
.btn-primary { @apply inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-3 rounded-xl transition; }
.card { @apply rounded-2xl shadow-md p-6 bg-white; }
```

---

## 6) src/_data/site.json

```json
{
  "name": "AutoFlowGP",
  "url": "https://www.autoflowgp.fr",
  "description": "Automatisation de workflows et intégrations no-code pour PME et créateurs.",
  "navigation": [
    { "label": "Accueil", "href": "/" },
    { "label": "Services", "href": "/services/" },
    { "label": "À propos", "href": "/about/" },
    { "label": "Blog", "href": "/blog/" },
    { "label": "Contact", "href": "/contact/" }
  ]
}
```

---

## 7) src/_includes/layouts/base.njk

```njk
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{ title ? title + " – " : "" }}{{ site.name }}</title>
  <meta name="description" content="{{ description or site.description }}" />
  <link rel="stylesheet" href="/assets/main.css" />
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-slate-50 text-slate-800">
  <header class="border-b bg-white/80 backdrop-blur">
    <nav class="container-xl flex items-center justify-between h-16">
      <a href="/" class="font-semibold">{{ site.name }}</a>
      <ul class="flex items-center gap-6">
        {% for item in site.navigation %}
        <li><a href="{{ item.href }}" class="hover:text-primary-600">{{ item.label }}</a></li>
        {% endfor %}
      </ul>
    </nav>
  </header>

  <main class="container-xl py-10 min-h-[70vh]">
    {{ content | safe }}
  </main>

  <footer class="mt-16 border-t py-10 text-sm text-slate-500">
    <div class="container-xl flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
      <p>© {{ "now" | date("yyyy") }} {{ site.name }}. Tous droits réservés.</p>
      <p><a href="/" class="hover:text-primary-600">Mentions légales</a></p>
    </div>
  </footer>
</body>
</html>
```

---

## 8) src/_includes/components/pricing.njk

```njk
<section class="grid md:grid-cols-3 gap-6">
  {% set plans = [
    {
      name: "Essentiel",
      price: "€299",
      features: ["Audit de base", "1–2 automatisations", "Notion simple", "Support 7 jours"]
    },
    {
      name: "Pro",
      price: "€690",
      features: ["Audit complet", "3–5 automatisations", "Mini‑CRM Notion", "1 mois maintenance"]
    },
    {
      name: "Premium",
      price: "Sur devis",
      features: ["Conseil stratégique", "Automatisations avancées", "CRM + Reporting", "Formation + support"]
    }
  ] %}

  {% for p in plans %}
  <div class="card">
    <h3 class="text-xl font-semibold">{{ p.name }}</h3>
    <p class="text-3xl mt-2">{{ p.price }}</p>
    <ul class="mt-4 space-y-2">
      {% for f in p.features %}
      <li class="flex items-start gap-2"><span class="mt-1 h-2 w-2 rounded-full bg-primary-600"></span>{{ f }}</li>
      {% endfor %}
    </ul>
    <a href="/contact/" class="btn-primary mt-6">Demander un devis</a>
  </div>
  {% endfor %}
</section>
```

---

## 9) Pages

### src/index.njk
```njk
---
layout: layouts/base.njk
title: Accueil
description: Automatisation no-code et intégrations pour PME, e‑commerce et créateurs.
---
<section class="py-10">
  <div class="text-center max-w-3xl mx-auto">
    <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">Automatisez vos flux. Concentrez‑vous sur la croissance.</h1>
    <p class="mt-4 text-lg text-slate-600">AutoFlowGP conçoit et maintient vos automatisations avec Make, Notion, Webflow, Stripe, Memberstack.</p>
    <div class="mt-6 flex justify-center gap-4">
      <a href="/services/" class="btn-primary">Voir les packs</a>
      <a href="/contact/" class="inline-block px-5 py-3 rounded-xl border">Parler à un expert</a>
    </div>
  </div>
</section>

<section class="mt-12 grid md:grid-cols-3 gap-6">
  <div class="card">
    <h3 class="font-semibold text-lg">Audit & Conseil</h3>
    <p class="mt-2 text-slate-600">Cartographie de vos outils, identification des tâches répétitives, plan d’automatisation.</p>
  </div>
  <div class="card">
    <h3 class="font-semibold text-lg">Workflows & Intégrations</h3>
    <p class="mt-2 text-slate-600">Make/Zapier, Notion, Webflow, Stripe, Memberstack, Gmail, réseaux sociaux.</p>
  </div>
  <div class="card">
    <h3 class="font-semibold text-lg">Maintenance & Formation</h3>
    <p class="mt-2 text-slate-600">Support mensuel, documentation, sessions d’équipe.</p>
  </div>
</section>
```

### src/services.njk
```njk
---
layout: layouts/base.njk
title: Services
---
<h1 class="text-3xl font-bold">Nos offres</h1>
<p class="mt-3 text-slate-600">Trois packs pour s’adapter à votre maturité et à vos objectifs.</p>
{% include "components/pricing.njk" %}

<section class="mt-12 grid md:grid-cols-2 gap-6">
  <div class="card">
    <h2 class="text-xl font-semibold">Solutions sectorielles</h2>
    <ul class="mt-3 list-disc pl-6 text-slate-700">
      <li>Commerçants / restaurateurs</li>
      <li>Tourisme</li>
      <li>Formateurs / auto‑écoles</li>
      <li>Influenceurs / e‑commerce</li>
    </ul>
  </div>
  <div class="card">
    <h2 class="text-xl font-semibold">Outils internes</h2>
    <p class="mt-3">Dashboards Notion, mini‑CRM, reporting automatique, fiches clients.</p>
  </div>
</section>
```

### src/about.njk
```njk
---
layout: layouts/base.njk
title: À propos
---
<h1 class="text-3xl font-bold">À propos</h1>
<p class="mt-3 text-slate-700">AutoFlowGP aide les PME et créateurs à automatiser leurs processus afin de gagner du temps et réduire les erreurs.</p>
```

### src/contact.njk
```njk
---
layout: layouts/base.njk
title: Contact
---
<h1 class="text-3xl font-bold">Contact</h1>
<p class="mt-3 text-slate-700">Décrivez votre besoin. Réponse sous 24–48 h ouvrées.</p>
<form action="https://formspree.io/f/xxxxxx" method="POST" class="mt-6 max-w-xl space-y-4">
  <input type="text" name="name" placeholder="Nom" required class="w-full border rounded-xl px-4 py-3" />
  <input type="email" name="email" placeholder="Email" required class="w-full border rounded-xl px-4 py-3" />
  <textarea name="message" placeholder="Votre message" rows="6" required class="w-full border rounded-xl px-4 py-3"></textarea>
  <button type="submit" class="btn-primary">Envoyer</button>
</form>
```

### Blog

#### src/blog/index.njk
```njk
---
layout: layouts/base.njk
title: Blog
---
<h1 class="text-3xl font-bold">Blog</h1>
<ul class="mt-6 space-y-4">
  {% for post in collections.posts %}
  <li>
    <a href="{{ post.url }}" class="text-lg font-semibold hover:text-primary-600">{{ post.data.title }}</a>
    <p class="text-sm text-slate-500">{{ post.date | date("dd/MM/yyyy") }}</p>
  </li>
  {% endfor %}
</ul>
```

#### src/blog/posts/2025-09-19-hello-world.md
```md
---
layout: layouts/base.njk
title: "Bienvenue sur le blog AutoFlowGP"
---
Premier article. Présentation de l’approche AutoFlowGP, cas d’usage, et feuille de route.
```

---

## 10) Commandes d’installation

```bash
# 1) Initialisation
npm init -y

# 2) Dépendances
npm i -D @11ty/eleventy tailwindcss npm-run-all alpinejs

# 3) Tailwind CLI
npx tailwindcss init

# 4) Lancer le dev (2 terminaux en 1 via npm-run-all)
npm run dev   # http://localhost:8080

# 5) Build production
npm run build
```

Note: Eleventy servira `_site` sur `http://localhost:8080` en mode dev.

---

## 11) Déploiement Netlify

- Connecter le repo GitHub.
- Build command: `npm run build`
- Publish directory: `_site`
- Ajouter un domaine personnalisé (CNAME).

---

## 12) SEO de base (à ajouter vite)

- `sitemap.xml` statique ou plugin 11ty (optionnel).
- `robots.txt` dans `public/`.
- Balises `title`/`description` déjà en place. Ajoute `og:*` et `twitter:*` au besoin dans `base.njk`.

```njk
<meta property="og:title" content="{{ title or site.name }}"/>
<meta property="og:description" content="{{ description or site.description }}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="{{ site.url }}{{ page.url }}"/>
```

---

## 13) Personnalisation rapide

- Couleurs: modifie `tailwind.config.js` (palette `primary`, `dark`).
- Typo: ajoute Google Fonts dans `base.njk`.
- Logo: place `/public/assets/logo.svg` et référence‑le dans le header.
- Formulaire: remplace l’URL Formspree par la tienne.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style> body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;} </style>
```

---

## 14) Next steps

1) Remplir les textes Services et About avec tes offres exactes.
2) Ajouter 2–3 articles (études de cas, tutos Make/Notion/Stripe).
3) Vérifier responsive. Compresser les images.
4) Activer analytics (Plausible, Matomo ou GA4) dans `base.njk`.
