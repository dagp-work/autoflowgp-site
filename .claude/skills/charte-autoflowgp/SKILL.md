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

- **Vouvoiement** du lecteur, **« je »** pour AutoFlowGP : l'activité est menée par une seule personne, Axel (Île-de-France). Ne jamais écrire « nous », « notre équipe » ni laisser entendre une équipe. Le parcours d'Axel (informatique web et réseaux + vendeur, conseiller, formateur, moniteur) est présenté sur `/about/`.
- Ne pas genrer Axel : éviter « fondateur/fondatrice », « seul/seule », « basé/basée », « passionné/passionnée » ; préférer « créé par Axel », « je travaille en direct », « AutoFlowGP est basé en Île-de-France ».
- À ce jour, seule `/about/` est au « je » ; les autres pages et articles utilisent encore « nous » (harmonisation à faire).
- Phrases **courtes**, verbe d'action en tête, bénéfice avant la technique (« Moins d'opérations manuelles. Plus d'exécution. »).
- Concret : nommer la tâche automatisée (relance, devis, facture, rendez-vous) et l'outil.
- Pas de jargon non expliqué, pas de superlatifs creux (« révolutionnaire », « ultime »), pas de promesse chiffrée non prouvée.
- Typographie française : espace insécable avant `? ! : ;` (`&nbsp;` dans le HTML), apostrophe typographique `’`, guillemets « ».
- Prix : symbole après le montant, fourchette avec tiret demi-cadratin, espaces insécables (`150–250 €`, `1 200 €`), jamais `€150 - 250`.
- Chaque page se termine par un **appel à l'action** vers `/contact/` (« Parler de votre cas », « Demander un devis », « Démarrer un cadrage »).

## Couleurs

Le site a **deux thèmes** qui suivent le réglage de l'appareil (`prefers-color-scheme`, variantes `dark:` de Tailwind). Toute couleur claire ajoutée doit avoir sa variante `dark:` — sinon le texte devient illisible en mode sombre.

| Rôle | Clair | Sombre |
|---|---|---|
| Fond de page | `bg-slate-50` | `dark:bg-black` (fond noir = celui du logo) |
| Texte principal | `text-slate-800` | `dark:text-slate-100` (corps : `dark:text-slate-200`) |
| Texte courant | `text-slate-700` | `dark:text-slate-300` |
| Texte secondaire | `text-slate-600` | `dark:text-slate-400` |
| Texte discret | `text-slate-500` | `dark:text-slate-400` |
| Lien | `text-primary-700` (`#2563EB`) | `dark:text-primary-400` (`#60A5FA`) |
| Lien au survol | `hover:text-primary-800` | `dark:hover:text-primary-300` |
| Bordures | `border` (gris par défaut) | automatique (`neutral-800` dans `tailwind.css`) |
| Texte d'article | `prose` | `dark:prose-invert` |

Ne pas utiliser `text-primary-600` (`#3B82F6`) pour du texte sur fond clair : contraste insuffisant (3,7 pour 4,5 requis). Il reste valable pour des pastilles ou décorations.
Les boutons `.btn-primary` sont identiques dans les deux thèmes (`primary-700`, survol `primary-800`, texte blanc).

**Palette du logo** (`public/assets/img/logo.png`, dégradé sur fond noir) : turquoise `#18DCA5` → vert d'eau `#60C5A0` → corail `#EB8E6E` → orange `#F29D56` → jaune `#EECB2C`.
Elle n'est **pas encore** reprise dans le site (qui est en bleu). Ne pas mélanger les deux de sa propre initiative : c'est une décision de marque à faire valider par l'utilisateur. Pour des supports hors site (réseaux, print), la palette logo est la plus distinctive.

## Classes maison (à réutiliser, ne pas réinventer)

Définies dans `src/styles/tailwind.css`, elles gèrent déjà les deux thèmes : pas besoin d'ajouter de `dark:`.

| Classe | Usage |
|---|---|
| `.container-xl` | Largeur de contenu (déjà posée par le layout sur `<main>`) |
| `.btn-primary` | Bouton principal (CTA) |
| `.btn-ghost` | Bouton secondaire (bordure) |
| `.card` | Bloc arrondi : blanc avec ombre en clair, gris foncé avec liseré en sombre |
| `.field` | Champ de formulaire (`input`, `textarea`) |

Pièges connus :
- `.btn` **n'existe pas** → `.btn-primary` ou `.btn-ghost` (`verif-avant-deploy` le signale).
- Une couleur sans variante `dark:` n'est pas signalée par le script : vérifier visuellement en mode sombre (Playwright `colorScheme: 'dark'`, ou réglage sombre du téléphone).

## Mise en page

- Layout de référence : `layouts/base.njk` (`layout.njk` le réutilise) ; articles : `layouts/post.njk`.
- Un seul `<h1>` par page, `text-3xl font-bold` (accueil et landings : `text-4xl`).
- Sections : `<section class="mt-12">` avec `<h2 class="text-xl font-semibold">`.
- Grilles responsives : `grid md:grid-cols-2|3 gap-6`.
- Mobile d'abord : rien ne doit déborder à 375 px (`npm run check` ne le teste pas : vérifier dans le navigateur).

## Supports hors site

Si la skill compte `wendy-style-maison` (ou `wendy-atelier-charte`) est disponible, lui passer cette charte comme charte client (couleurs du logo + ton ci-dessus) pour produire flyers, posts et brochures cohérents avec le site.
