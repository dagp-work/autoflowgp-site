---
date: 2026-10-29T11:00:00
layout: layouts/post.njk
title: "Avis Google restaurant : les demander automatiquement"
description: "Obtenez plus d’avis Google pour votre restaurant : une demande envoyée au bon moment, automatiquement, dans le respect des règles de Google."
---

# Avis Google pour votre restaurant : les demander automatiquement

Avant de choisir où dîner, beaucoup de clients regardent la note Google et lisent quelques avis. Le problème : les clients satisfaits laissent rarement un avis spontanément, alors qu’un client mécontent, lui, prend souvent le temps d’écrire. Résultat, votre note ne reflète pas toujours la réalité de votre salle.

La solution n’est pas de supplier vos clients à la caisse. C’est de leur envoyer une demande simple, au bon moment, avec le lien direct vers votre fiche. Et cette demande peut partir toute seule.

Dans cet article : comment automatiser les demandes d’avis Google, à quel moment les envoyer et surtout quelles règles respecter pour ne pas mettre votre fiche en danger.

## Pourquoi demander à la main ne suffit pas

Certains restaurateurs posent une carte avec un QR code sur la table ou glissent un mot à l’addition. C’est utile, mais :

- le client est en train de partir, il a autre chose en tête ;
- il dit « oui, bien sûr » et oublie une fois dehors ;
- le personnel n’y pense pas à chaque service, surtout dans le rush.

Un message envoyé quelques heures après le repas arrive quand le client est au calme, avec le souvenir encore frais. Et il part à chaque fois.

## Le workflow en 4 étapes

### 1. Récupérer le contact du client

La demande d’avis s’appuie sur le contact laissé lors de la réservation : email ou téléphone. Si vos réservations sont déjà centralisées (Google Sheets, Notion ou votre outil de réservation), vous avez déjà cette liste. Sinon, commencez par là : c’est la même base que pour [les rappels de réservation automatiques](/blog/posts/2026-10-29-restaurant-no-show-rappels-automatiques/).

### 2. Attendre le bon moment

Un scénario **Make** (ou **Zapier**) repère les réservations honorées du jour, puis attend. Le lendemain matin ou le jour même en fin de soirée fonctionnent souvent bien : le client a eu le temps de rentrer, sans avoir encore oublié son repas. Testez et ajustez selon votre clientèle.

### 3. Envoyer un message court avec le lien direct

Le message tient en trois lignes : un remerciement, une phrase personnelle et le lien qui ouvre directement la fenêtre d’avis de votre fiche Google. Ce lien se récupère dans votre compte Google Business Profile.

Exemple :

> Merci d’être venus hier soir chez nous ! Si vous avez apprécié votre repas, un avis Google nous aiderait beaucoup : [lien]. À bientôt.

### 4. Ne pas relancer à l’infini

Un seul rappel, quelques jours plus tard, au maximum. Le scénario note dans votre base qui a déjà reçu une demande, pour ne jamais solliciter deux fois le même client pour le même repas.

## Les règles à respecter absolument

C’est la partie que beaucoup ignorent, et qui peut coûter cher.

**Demandez à tout le monde, pas seulement aux clients satisfaits.** Filtrer les clients pour n’envoyer la demande qu’aux contents (par exemple, « Vous avez aimé ? Laissez un avis Google. Pas aimé ? Écrivez-nous en privé. ») est contraire aux règles de Google sur les avis. Votre fiche peut être sanctionnée. Le message doit être le même pour tous.

**N’offrez rien en échange d’un avis.** Pas de dessert offert, pas de réduction, pas de tirage au sort. Les avis contre récompense sont interdits par Google et, en France, encadrés par la réglementation sur les avis en ligne.

**Respectez le consentement.** Un contact laissé pour réserver peut servir pour le suivi de cette réservation, mais restez sobre : un message, un rappel au plus, et un moyen de ne plus rien recevoir.

## Et les avis négatifs ?

Ils arriveront aussi, et c’est normal. Une note crédible n’est pas un 5/5 parfait. L’automatisation peut vous aider ici aussi : un scénario peut surveiller les nouveaux avis et vous prévenir immédiatement lorsqu’un avis de 1 ou 2 étoiles est publié. Vous répondez vite, calmement, publiquement, et les futurs clients voient un restaurant qui écoute.

## Un exemple concret

Prenons un bistrot qui note ses réservations dans Notion.

1. Chaque soir à 23 h, Make récupère les réservations du jour marquées « honorées ».
2. Le lendemain à 10 h, chaque client reçoit un email de remerciement avec le lien d’avis Google.
3. Trois jours plus tard, ceux qui n’ont pas ouvert l’email reçoivent un unique rappel.
4. Chaque nouvel avis de 1 ou 2 étoiles déclenche une notification sur le téléphone du gérant.

Aucune action manuelle, et une demande envoyée à chaque client, pas seulement quand quelqu’un y pense.

## Pour aller plus loin

Une fois vos contacts clients organisés, d’autres tâches s’automatisent avec la même base : [les rappels de réservation contre les no-shows](/blog/posts/2026-10-29-restaurant-no-show-rappels-automatiques/) et [le traitement des demandes de groupes et de privatisation](/blog/posts/2026-10-29-restaurant-groupes-privatisation-automatiser/).

Retrouvez toutes nos solutions pour les restaurateurs sur la page [Automatisation pour restaurants](/services/restaurants/), et nos formules sur la page [nos packs](/services/).

Vous voulez plus d’avis sans y penser à chaque service ? [Parlons de votre cas](/contact/) : nous mettons en place la demande d’avis automatique, dans les règles.
