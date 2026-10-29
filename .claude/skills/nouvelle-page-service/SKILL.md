---
name: nouvelle-page-service
description: Crée une page d'offre ou une landing page AutoFlowGP (service, secteur, outil ou offre test) en Nunjucks, avec les composants et la charte du site et un appel à l'action vers le contact. À utiliser quand on demande une nouvelle page de service, une page secteur (restaurants, e-commerce…), une landing page, une page pour tester une offre, ou d'ajouter une page au menu.
---

# Nouvelle page de service / landing

Une page = **une cible + une promesse + une action**. Si l'une des trois manque, la demander (ou la proposer) avant d'écrire.

## 1. Cadrer

- **Cible** : qui lit ? (ex. : restaurateurs, créateurs de contenu, e-commerçants)
- **Promesse** : le résultat obtenu, en une phrase (« Plus aucune réservation oubliée »).
- **Action** : `/contact/` par défaut ; ou un pack de `/services/`.
- **Menu** : la page doit-elle apparaître dans la navigation ? (Par défaut non : une landing se partage par lien ou pub.)

Lire la skill `charte-autoflowgp` (ton, couleurs, classes) avant d'écrire.

## 2. Créer le fichier

- Page de premier niveau : `src/<slug>.njk` → servie en `/<slug>/`.
- Page secteur / offre : `src/services/<slug>.njk` → `/services/<slug>/`.
  (Le fichier `src/services.njk` reste la page `/services/`.)

Slug court, minuscules, sans accents, mots séparés par `-`.

```njk
---
title: "Titre ≤ 60 car. | AutoFlowGP"
description: "Promesse + cible, 120–160 caractères."
layout: layouts/base.njk
---

<section class="py-10">
  <h1 class="text-4xl font-bold">Promesse en une phrase</h1>
  <p class="mt-3 text-slate-600 dark:text-slate-400">Pour qui, et ce que ça change concrètement.</p>
  <div class="mt-6 flex flex-wrap gap-3">
    <a href="/contact/" class="btn-primary">Parler de votre cas</a>
  </div>
</section>
```

## 3. Sections recommandées (dans cet ordre, garder celles qui servent)

1. **Hero** (ci-dessus) : promesse, sous-titre, CTA.
2. **Le problème** : 3 douleurs concrètes de la cible (`grid md:grid-cols-3 gap-6` de `.card`).
3. **Ce que j’automatise pour vous** : liste de tâches + outils (Make, Zapier, Stripe, Notion, Webflow).
4. **Méthode** : Audit → Mise en place → Tests → Suivi (reprendre la formulation de l'accueil).
5. **Packs** : `{% include "components/pricing.njk" %}` — ne jamais recopier les prix en dur.
6. **Questions fréquentes** (optionnel) : 3–5 questions, accordéon Alpine.js possible :
   ```html
   <div x-data="{ open: false }" class="card">
     <button @click="open = !open" class="w-full text-left font-semibold">Question ?</button>
     <p x-show="open" x-cloak class="mt-3 text-slate-700 dark:text-slate-300">Réponse.</p>
   </div>
   ```
7. **CTA final** : `<section class="mt-12">` + phrase de réassurance (« Réponse sous 24–48 h ouvrées ») + `.btn-primary` vers `/contact/`.

Règles :
- Un seul `<h1>`, sections en `<h2 class="text-xl font-semibold">`.
- Uniquement des classes existantes : `.btn-primary`, `.btn-ghost`, `.card`, `.field`, utilitaires Tailwind. **Pas** de `.btn`.
- Chaque couleur de texte a sa variante sombre (`text-slate-600 dark:text-slate-400`…) : voir le tableau de la skill `charte-autoflowgp`, et vérifier la page en mode sombre.
- Ne jamais inventer témoignages, logos clients ou chiffres de résultat.
- Si un bloc sert sur plusieurs pages, le créer dans `src/_includes/components/<nom>.njk` et l'inclure.

## 4. Menu (si demandé)

Ajouter l'entrée dans `src/_data/site.json` → `navigation` (`{ "label": "…", "href": "/slug/" }`). Garder le menu court : au-delà de 6 liens, proposer plutôt un lien depuis `/services/`.

## 5. Vérifier et livrer

```bash
npm run check
```

Zéro erreur liée à la nouvelle page (skill `verif-avant-deploy`). Puis donner : chemin du fichier, URL, title/description, et une suggestion pour mesurer la page (ex. : lien dédié partagé en pub ou sur les réseaux, nombre de demandes de contact reçues).
