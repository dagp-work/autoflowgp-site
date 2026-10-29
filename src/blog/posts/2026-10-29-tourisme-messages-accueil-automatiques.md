---
date: 2026-10-29T17:00:00
layout: layouts/post.njk
title: "Messages d’accueil automatiques pour gîtes et activités"
description: "Itinéraire, horaires, code d’accès, équipement, avis : automatisez les messages avant et après le séjour ou l’activité de vos clients."
---

# Messages d’accueil automatiques : avant, pendant et après le séjour

« À quelle heure peut-on arriver ? » « Où se gare-t-on ? » « Faut-il prévoir des chaussures de marche ? » Si vous tenez un gîte, une chambre d’hôtes ou une activité de loisirs, vous répondez à ces questions des dizaines de fois par saison. Souvent par téléphone, au mauvais moment.

Ces informations sont pourtant toujours les mêmes. Envoyées automatiquement au bon moment, elles évitent la plupart des appels, rassurent vos clients… et vous font gagner des avis.

## Le parcours en 4 messages

### 1. À la réservation : la confirmation complète

Dès la réservation confirmée, le client reçoit un récapitulatif : dates ou créneau, nombre de personnes, montant payé et restant, conditions d’annulation, contact en cas de question.

### 2. Quelques jours avant : les infos pratiques

C’est le message qui évite le plus d’appels. Il contient :

- **l’adresse et l’itinéraire**, avec un lien de carte et les indications que le GPS ne donne pas (« après le pont, deuxième chemin à gauche ») ;
- **les horaires** d’arrivée et de départ, ou de rendez-vous pour l’activité ;
- **ce qu’il faut prévoir** : linge, équipement, tenue, âge minimum ;
- **le stationnement**.

### 3. La veille ou le jour même : l’accès

Pour les arrivées autonomes : le code de la boîte à clés ou de la porte, envoyé au dernier moment et seulement si le solde est réglé. Pour une activité : un rappel avec l’heure et le point de rendez-vous.

### 4. Après : merci et avis

Le lendemain du départ ou de l’activité, un message de remerciement avec un lien vers votre fiche Google. Les règles sont les mêmes que [pour les restaurants](/blog/posts/2026-10-29-restaurant-avis-google-automatiques/) : on demande à tout le monde, sans récompense en échange.

Quelques mois plus tard, un message pour la saison suivante peut aussi partir, si le client a accepté de recevoir vos offres.

## Comment ça marche

1. Les réservations arrivent dans un calendrier ou une base **Notion** (voir mon article sur [les réservations en direct](/blog/posts/2026-10-29-tourisme-reservations-directes/)).
2. Un scénario **Make** calcule les dates d’envoi de chaque message à partir de la date d’arrivée.
3. Les messages partent par email ou SMS, personnalisés avec le prénom, les dates et le logement ou l’activité réservés.
4. Si la réservation est annulée ou modifiée, les messages sont annulés ou décalés automatiquement.

## Et les réservations des plateformes ?

Les grandes plateformes de location proposent en général leurs propres **messages programmés** dans leur messagerie. Pour les clients qui ont réservé chez elles, utilisez ces outils : les plateformes encadrent strictement les échanges en dehors de leur messagerie.

L’automatisation décrite ici s’applique pleinement à vos **réservations directes**, et vos textes peuvent être les mêmes partout, pour un accueil identique quel que soit le canal.

## Un exemple concret

Prenons un centre de canoë-kayak qui propose des descentes de rivière.

1. À la réservation : confirmation avec le parcours choisi et le montant.
2. Trois jours avant : tenue à prévoir, savoir nager obligatoire, point de rendez-vous avec plan.
3. La veille à 18 h : rappel de l’heure et de la météo prévue.
4. Le lendemain : merci, photos de la journée si vous en proposez, lien pour l’avis Google.

## Les pièges à éviter

**Un message trop long.** Personne ne lit une page entière sur son téléphone. Les informations essentielles d’abord, le reste dans un lien.

**Le code d’accès envoyé trop tôt.** Envoyez-le le plus tard possible, et seulement quand tout est réglé.

**Des informations périmées.** Des travaux sur la route, un nouveau point de rendez-vous : mettez à jour vos modèles de messages à chaque début de saison.

**Oublier les annulations.** Un client annulé qui reçoit quand même le code d’accès, c’est un problème. Le scénario doit vérifier le statut de la réservation avant chaque envoi.

## Pour aller plus loin

Ces messages s’appuient sur un bon système de réservation : voir [prendre plus de réservations en direct](/blog/posts/2026-10-29-tourisme-reservations-directes/). Pour les activités en extérieur, lisez aussi [la gestion des créneaux et des annulations météo](/blog/posts/2026-10-29-loisirs-creneaux-annulations-meteo/).

Toutes mes solutions sont sur la page [Automatisation pour le tourisme et les loisirs](/services/tourisme-loisirs/), et mes formules sur la page [mes packs](/services/).

Vous répondez toujours aux mêmes questions pendant la saison ? [Parlons de votre activité](/contact/) : j’écris avec vous les messages et je les programme une bonne fois pour toutes.
