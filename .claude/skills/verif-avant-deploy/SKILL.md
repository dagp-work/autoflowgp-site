---
name: verif-avant-deploy
description: Contrôle qualité du site AutoFlowGP avant mise en production (build, titres et meta SEO, liens internes cassés, images sans alt, h1, front-matter des articles, formulaires provisoires, classes CSS sans effet). À utiliser avant tout push ou merge sur main, après avoir créé ou modifié une page ou un article, ou quand on demande « vérifie le site », « est-ce qu'on peut déployer », « check avant prod ».
---

# Vérification avant déploiement

Netlify publie automatiquement chaque push sur `main`. Cette skill est le dernier contrôle avant que le site parte chez les clients.

## 1. Lancer le contrôle

```bash
npm run check
```

(équivaut à `node .claude/skills/verif-avant-deploy/scripts/check-site.mjs` : build de production, puis analyse de `_site/` et `src/blog/posts/`.)
Si le build vient d'être fait, `-- --no-build` évite de le relancer.

Le script sépare :
- **ERREURS** → bloquantes : ne pas pousser sur `main` tant qu'il en reste.
- **AVERTISSEMENTS** → qualité/SEO : à corriger si c'est simple, sinon à signaler.

## 2. Corriger

| Message | Correction habituelle |
|---|---|
| `pas de front-matter` | Le fichier `.md` doit commencer directement par `---` (pas de titre ni de bloc ```` ``` ```` avant). Voir la skill `nouvel-article`. |
| `<title> vide ou provisoire` | Renseigner `title:` dans le front-matter de la page source (`src/…`). |
| `meta description absente` / longueur | Ajouter `description:` (50–160 caractères, bénéfice client + mot-clé). |
| `lang manquant` / `aucun <h1>` | Le plus souvent : page sans `layout`. Ajouter `layout: layouts/base.njk`. |
| `lien interne cassé` | Corriger le chemin (les pages sont servies en `/page/`) ou créer la page. |
| `image sans alt` | Ajouter un `alt` descriptif (ou `alt=""` uniquement pour une image purement décorative — le script la signale quand même, à confirmer). |
| `formulaire avec une URL provisoire` | Le site utilise **Netlify Forms** : `<form name="…" method="POST" action="/merci/" data-netlify="true" netlify-honeypot="site-web">` + `<input type="hidden" name="form-name" value="…">`. Aucun identifiant externe nécessaire. |
| `Markdown brut` | Un bloc ```` ``` ```` ou un titre `####` a été collé par erreur dans un `.njk` : le supprimer. |
| `classe … absente du CSS` | Classe Tailwind inexistante ou utilitaire perso non défini. Remplacer par une classe de la charte (skill `charte-autoflowgp`) ou la définir dans `src/styles/tailwind.css`. |

Ne corriger que ce qui est demandé ou évident ; pour un contenu (texte, prix, identifiant), demander à l'utilisateur.

## 3. Rendre compte

Terminer par un résumé court :
- verdict (✅ prêt / ❌ à corriger),
- ce qui a été corrigé,
- ce qui reste et qui doit trancher (l'utilisateur).

Relancer `npm run check` après correction pour prouver le résultat — ne pas annoncer « prêt » sans un passage à 0 erreur.
