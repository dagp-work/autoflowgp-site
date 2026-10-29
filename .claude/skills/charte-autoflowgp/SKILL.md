---
name: charte-autoflowgp
description: Charte de marque AutoFlowGP — couleurs, classes Tailwind maison, composants, ton de voix et règles de rédaction. À consulter avant d'écrire ou de modifier toute page, article, composant ou support AutoFlowGP (site, post réseau, flyer, email), ou quand on parle de couleurs, style, ton, design ou cohérence de marque.
---

# Charte AutoFlowGP

Source de vérité technique : `tailwind.config.js` et `src/styles/tailwind.css`. Si cette charte et le code divergent, le code fait foi pour le site — signale l'écart.

## Positionnement

- **Promesse** : « Gagnez du temps. Réduisez les erreurs. »
- **Offre** : automatisation de workflows et intégrations no-code pour PME, indépendants et créateurs.
- **Outils cités** : Make, Zapier, Stripe, Notion, Webflow.
- **Cibles** : commerçants / restaurateurs, tourisme / loisirs, artistes / créateurs de contenu, e-commerce / influence.
- **Méthode en 4 temps** : Audit → Mise en place → Tests → Suivi.
- **Packs** (définis dans `src/_includes/components/pricing.njk`, ne pas recopier les prix ailleurs) : Starter, Pro, Premium + sur-mesure.

## Ton de voix

- **Vouvoiement** du lecteur, « nous » pour AutoFlowGP.
- Phrases **courtes**, verbe d'action en tête, bénéfice avant la technique (« Moins d'opérations manuelles. Plus d'exécution. »).
- Concret : nommer la tâche automatisée (relance, devis, facture, rendez-vous) et l'outil.
- Pas de jargon non expliqué, pas de superlatifs creux (« révolutionnaire », « ultime »), pas de promesse chiffrée non prouvée.
- Typographie française : espace insécable avant `? ! : ;` (`&nbsp;` dans le HTML), apostrophe typographique `’`, guillemets « ».
- Prix : symbole après le montant, fourchette avec tiret demi-cadratin, espaces insécables (`150–250 €`, `1 200 €`), jamais `€150 - 250`.
- Chaque page se termine par un **appel à l'action** vers `/contact/` (« Parler de votre cas », « Demander un devis », « Démarrer un cadrage »).

## Couleurs

| Rôle | Token Tailwind | Valeur |
|---|---|---|
| Action principale | `primary-600` | `#3B82F6` |
| Survol action | `primary-700` | `#2563EB` |
| Texte / fond sombre | `dark` | `#0F172A` |
| Fond de page | `slate-50` | — |
| Texte courant | `slate-800`, secondaire `slate-600`, discret `slate-500` | — |
| Cartes | `bg-white` (via `.card`) | — |

**Palette du logo** (`public/assets/img/logo.png`, dégradé sur fond noir) : turquoise `#18DCA5` → vert d'eau `#60C5A0` → corail `#EB8E6E` → orange `#F29D56` → jaune `#EECB2C`.
Elle n'est **pas encore** reprise dans le site (qui est en bleu). Ne pas mélanger les deux de sa propre initiative : c'est une décision de marque à faire valider par l'utilisateur. Pour des supports hors site (réseaux, print), la palette logo est la plus distinctive.

## Classes maison (à réutiliser, ne pas réinventer)

| Classe | Usage |
|---|---|
| `.container-xl` | Largeur de contenu (déjà posée par le layout sur `<main>`) |
| `.btn-primary` | Bouton principal (CTA) |
| `.btn-ghost` | Bouton secondaire |
| `.card` | Bloc blanc arrondi avec ombre |

Pièges connus (signalés par `verif-avant-deploy`) :
- `.btn` **n'existe pas** → utiliser `.btn-primary` ou `.btn-ghost`.
- `prose` / `prose-invert` **n'ont aucun effet** : le plugin `@tailwindcss/typography` n'est pas installé.
- `.btn-primary` est défini deux fois dans `tailwind.css` ; la seconde définition (`bg-blue-600`, `rounded-lg`) l'emporte.
- `.btn-ghost` est conçu pour un fond sombre (texte `slate-100`) : peu lisible sur le fond clair actuel.
- Les cartes « Bénéfices » de l'accueil utilisent `bg-slate-900` avec du texte `slate-600` : contraste insuffisant.

## Mise en page

- Layout de référence : `layouts/base.njk` (le doublon `layout.njk` est identique ; préférer `layouts/base.njk` pour tout nouveau contenu).
- Un seul `<h1>` par page, `text-3xl font-bold` (accueil : `text-4xl`).
- Sections : `<section class="mt-12">` avec `<h2 class="text-xl font-semibold">`.
- Grilles responsives : `grid md:grid-cols-2|3 gap-6`.
- Mobile d'abord : vérifier que rien ne déborde sous 375 px (la nav actuelle a 5 liens sur une ligne, à surveiller).

## Supports hors site

Si la skill compte `wendy-style-maison` (ou `wendy-atelier-charte`) est disponible, lui passer cette charte comme charte client (couleurs du logo + ton ci-dessus) pour produire flyers, posts et brochures cohérents avec le site.
