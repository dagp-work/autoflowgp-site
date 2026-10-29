---
name: nouvel-article
description: Rédige et publie un article de blog AutoFlowGP (Markdown + front-matter Eleventy) optimisé SEO et orienté conversion vers les services et le contact. À utiliser quand on demande un article, un billet, un post de blog, un cas client, un tutoriel ou du contenu pour attirer des prospects sur autoflowgp.com.
---

# Nouvel article de blog

Objectif d'un article : **faire venir un prospect qualifié et l'amener à `/contact/`**. Un article sans lecteur cible ni appel à l'action n'est pas terminé.

## 1. Cadrer (demander seulement ce qui manque)

- **Sujet** et **lecteur cible** (ex. : restaurateur qui perd des réservations, créatrice qui facture à la main).
- **Requête visée** : la question que ce lecteur taperait dans Google (« automatiser ses factures Stripe », « relance client automatique »).
- **Angle** : tutoriel, cas client, comparatif d'outils, erreurs à éviter, checklist.
Si l'utilisateur donne juste un sujet, proposer lecteur + requête + angle en une ligne et avancer.

Lire la skill `charte-autoflowgp` pour le ton de voix avant d'écrire.

## 2. Créer le fichier

Chemin : `src/blog/posts/AAAA-MM-JJ-slug.md` (date du jour, slug court en minuscules, sans accents, mots séparés par `-`).
L'URL publiée sera `/blog/posts/AAAA-MM-JJ-slug/`.

Le fichier **commence directement** par le front-matter :

```md
---
layout: layouts/post.njk
title: "Titre ≤ 60 caractères avec la requête visée"
description: "Bénéfice concret pour le lecteur, 120–160 caractères."
---

# Titre (même idée que title, peut être plus long)

Introduction : le problème du lecteur en 2–3 phrases, puis ce qu'il saura faire à la fin.

## …
```

Règles :
- Un seul `# Titre` (h1) ; les sections en `##`, sous-sections en `###`.
- Pas de bloc ```` ``` ```` autour de l'article, pas de `####` avec le nom de fichier (c'est l'erreur qui casse `2025-09-19-hello-world.md`).
- La date vient du nom de fichier ; n'ajouter `date:` que pour forcer une autre date.
- `layouts/post.njk` met en forme le texte (typographie), affiche la date et ajoute automatiquement un encart d'appel à l'action en bas : ne pas le dupliquer, terminer plutôt par une phrase de transition vers `/contact/`.

## 3. Structure qui convertit

1. **Problème** vécu par le lecteur (concret, chiffré si possible sans inventer).
2. **Solution** pas à pas : outils nommés (Make, Zapier, Stripe, Notion, Webflow), étapes numérotées.
3. **Exemple** réaliste dans un des secteurs cibles.
4. **Pièges / limites** — montre l'expertise.
5. **Appel à l'action** final, par exemple :
   `Vous voulez ce workflow sans y passer vos soirées ? [Parlons de votre cas](/contact/) ou découvrez [mes packs](/services/).`
   Le texte est écrit au « je » (Axel), voir la skill `charte-autoflowgp`.

Longueur visée : 700–1 200 mots. Au moins **un lien vers `/services/`** et **un vers `/contact/`**. Liens internes en chemin absolu (`/services/`).
Ne jamais inventer de client, de témoignage, de chiffre ou de résultat : utiliser un exemple présenté comme tel (« Prenons un restaurant qui… ») ou demander les vrais chiffres.

## 4. Vérifier

```bash
npm run check
```

Corriger toute erreur liée au nouvel article (skill `verif-avant-deploy`). L'article doit apparaître dans `/blog/` avec son titre.

## 5. Livrer

Donner à l'utilisateur : chemin du fichier, URL finale, title + description, et 2–3 idées d'articles suivants qui forment une série sur le même sujet (maillage interne).
