# AutoFlowGP — site vitrine

Eleventy 3 + Tailwind CSS 3 + Alpine.js, déployé par Netlify à chaque push sur `main`. Contenu en français.

- `npm run dev` : serveur local · `npm run build` : build dans `_site/` · `npm run check` : build + contrôle qualité (obligatoire avant tout push sur `main`).
- Pages : `src/*.njk` · articles : `src/blog/posts/AAAA-MM-JJ-slug.md` · composants : `src/_includes/components/` · menu et infos du site : `src/_data/site.json`.
- Layout de référence : `layouts/base.njk`.
- SEO : `sitemap.xml` et `robots.txt` générés automatiquement (`src/sitemap.njk`, `src/robots.njk`), URL canonique posée par le layout. Une page à exclure de Google : `noindex: true` dans son front-matter.

## Skills du dépôt (`.claude/skills/`)

| Skill | Quand |
|---|---|
| `charte-autoflowgp` | Avant d'écrire ou styliser quoi que ce soit (ton, couleurs, classes). |
| `nouvel-article` | Nouvel article de blog. |
| `nouvelle-page-service` | Nouvelle page d'offre, secteur ou landing. |
| `verif-avant-deploy` | Avant un push/merge sur `main`, ou après toute modification de contenu. |

Ne jamais inventer témoignages, clients, chiffres de résultat ni identifiants : demander.
Ne jamais demander, utiliser ni écrire dans le dépôt un mot de passe ou une clé secrète.

Formulaires : Netlify Forms (`data-netlify="true"`, champ caché `form-name`, honeypot `site-web`), redirection vers `/merci/`. Les messages arrivent dans Netlify → Forms.
