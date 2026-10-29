---
date: 2026-10-29T12:00:00
layout: layouts/post.njk
title: "No-show au restaurant : automatiser les rappels"
description: "Réduisez les tables vides : rappels de réservation automatiques par SMS ou email, confirmation en un clic et liste d’attente, sans changer d’outil."
---

# No-show au restaurant : automatiser les rappels de réservation

Vendredi, 20 h 30. La table de six réservée depuis mardi est toujours vide. Personne n’a prévenu, le téléphone ne répond pas, et vous avez refusé deux couples une heure plus tôt. Le no-show, ce n’est pas seulement un couvert perdu : c’est du produit préparé pour rien, du personnel mobilisé et des clients refusés.

La bonne nouvelle : une grande partie des no-shows vient d’un simple oubli. Un rappel au bon moment, avec un moyen d’annuler en un clic, suffit souvent à libérer la table à temps. Et ce rappel n’a pas besoin d’être envoyé à la main.

Dans cet article, vous verrez comment mettre en place des rappels de réservation automatiques, quels outils utiliser et quelles erreurs éviter.

## Pourquoi les rappels manuels ne tiennent pas

Beaucoup de restaurateurs appellent ou écrivent eux-mêmes aux clients la veille. Ça marche… quand le service le permet. En pratique :

- les rappels sautent dès que la semaine est chargée, c’est-à-dire précisément quand ils comptent le plus ;
- ils dépendent d’une personne : si elle est absente, plus personne ne le fait ;
- un appel prend du temps, et un client qui veut annuler n’ose pas toujours le dire au téléphone.

Un rappel automatique, lui, part à chaque réservation, à l’heure prévue, même un samedi soir de rush.

## Le workflow en 5 étapes

L’idée : chaque réservation déclenche une petite chaîne d’actions, sans intervention de votre part.

### 1. Centraliser les réservations

Toutes les réservations doivent arriver au même endroit. Selon votre organisation, ce sera :

- votre outil de réservation en ligne, s’il permet d’exporter les réservations ou de les envoyer vers un autre outil ;
- un Google Agenda ou un Google Sheets partagé, si vous prenez les réservations au téléphone ;
- une base Notion, qui sert aussi de mini-CRM clients.

C’est le point de départ : sans liste fiable, aucune automatisation n’est possible.

### 2. Déclencher un scénario Make à chaque réservation

Avec **Make** (ou **Zapier**), un scénario surveille cette liste. À chaque nouvelle réservation, il récupère le nom, le nombre de couverts, la date, l’heure et le contact du client.

### 3. Envoyer une confirmation immédiate

Dans la minute, le client reçoit un email ou un SMS : « Votre table pour 4 est confirmée samedi à 20 h. » C’est rassurant pour lui, et c’est la preuve que la réservation existe vraiment.

### 4. Envoyer un rappel la veille ou le jour même

Le scénario attend jusqu’au moment choisi, par exemple la veille à 17 h ou le jour même à 11 h, puis envoie le rappel. Le point clé : **deux liens**, « Je confirme » et « Je dois annuler ».

Un client qui ne viendra pas préfère cliquer sur un lien que d’appeler pour s’excuser. Vous récupérez la table plusieurs heures à l’avance au lieu de la découvrir vide à 20 h 30.

### 5. Mettre à jour le planning et prévenir la salle

Quand le client clique, le scénario met à jour la réservation (confirmée ou annulée) et peut vous envoyer une notification. Une annulation peut aussi déclencher un message aux personnes en liste d’attente : la table se remplit sans un coup de fil.

## Un exemple concret

Prenons un restaurant de 40 couverts qui prend ses réservations par téléphone et sur Instagram, et les note dans un Google Sheets.

1. Chaque ligne ajoutée au tableau déclenche un scénario Make.
2. Le client reçoit une confirmation par SMS avec l’adresse et l’heure.
3. La veille à 17 h, un second SMS arrive : « À demain 20 h ! Un empêchement ? Annulez ici. »
4. Les annulations s’affichent en couleur dans le tableau et une notification part sur le téléphone du gérant.
5. Le samedi midi, un récapitulatif des réservations confirmées du soir arrive par email.

Résultat : plus aucun rappel à faire à la main, et une vision claire du service avant d’ouvrir.

## Les pièges à éviter

**Envoyer trop tôt ou trop tard.** Un rappel envoyé trois jours avant s’oublie ; envoyé une heure avant, il ne vous laisse pas le temps de relouer la table. La veille en fin d’après-midi est souvent un bon compromis, à ajuster selon votre clientèle.

**Oublier le lien d’annulation.** Un rappel sans moyen simple d’annuler n’apporte qu’une partie du bénéfice. C’est ce lien qui libère les tables.

**Négliger le consentement.** Les numéros et emails collectés pour une réservation servent à cette réservation. Pour envoyer ensuite des promotions, il faut l’accord explicite du client (RGPD). Gardez les deux usages séparés.

**Multiplier les outils.** Si les réservations arrivent par trois canaux, ramenez-les vers une seule liste avant d’automatiser. Sinon, une partie des clients ne recevra jamais de rappel.

**Ne rien surveiller.** Un scénario peut s’arrêter, par exemple si un mot de passe change. Prévoyez une alerte en cas d’erreur : vous le saurez le jour même, pas trois semaines plus tard.

## Combien de temps pour le mettre en place ?

Pour un restaurant avec une source de réservations claire, ce type de workflow tient dans un projet court : audit de votre façon de prendre les réservations, mise en place des scénarios, tests, puis suivi. C’est exactement le périmètre de mon pack Starter, présenté sur la page [mes packs](/services/).

## Pour aller plus loin

Les rappels de réservation sont la première brique. Une fois la liste de clients centralisée, vous pouvez aussi [demander automatiquement un avis Google après le repas](/blog/posts/2026-10-29-restaurant-avis-google-automatiques/) ou [gérer les demandes de groupes et de privatisation](/blog/posts/2026-10-29-restaurant-groupes-privatisation-automatiser/) sans y passer vos soirées.

Toutes mes solutions pour les restaurateurs sont réunies sur la page [Automatisation pour restaurants](/services/restaurants/).

Vous voulez ce workflow sans y passer vos soirées ? [Parlons de votre cas](/contact/) : je regarde comment vous prenez vos réservations aujourd’hui et ce qui peut être automatisé.
