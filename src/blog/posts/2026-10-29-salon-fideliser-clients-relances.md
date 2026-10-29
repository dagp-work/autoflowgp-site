---
date: 2026-10-29T14:00:00
layout: layouts/post.njk
title: "Fidéliser les clients de son salon automatiquement"
description: "Coiffure, beauté, bien-être : faites revenir vos clients au bon moment avec des relances automatiques adaptées à chaque prestation."
---

# Fidéliser les clients de son salon : la relance automatique au bon moment

Dans un salon, l’essentiel du chiffre d’affaires vient des clients qui reviennent. Pourtant, entre deux rendez-vous, beaucoup ne pensent pas à reprendre une date… jusqu’au jour où ils passent devant un autre salon, ou réservent ailleurs en deux clics.

Le problème n’est pas la qualité de votre travail. C’est le **timing**. Un client qui reçoit un message au bon moment, « ça fait six semaines depuis votre coupe, on reprend rendez-vous ? », revient souvent tout simplement parce qu’on le lui a proposé.

Cette relance, vous n’avez ni le temps ni l’envie de la faire à la main pour chaque client. Elle peut partir toute seule.

## Le principe : chaque prestation a son rythme

Une coupe homme, une coloration, une manucure ou un soin du visage n’ont pas le même rythme de renouvellement. L’idée est d’associer à chaque prestation un **délai de rappel**, que vous fixez selon votre expérience. Par exemple :

| Prestation | Relance après… (exemple à ajuster) |
|---|---|
| Coupe homme, barbe | 4 à 5 semaines |
| Coupe femme | 6 à 8 semaines |
| Couleur, racines | 5 à 6 semaines |
| Pose d’ongles, remplissage | 3 semaines |
| Soin du visage | 1 mois |

Ces délais sont des exemples : c’est vous qui connaissez votre clientèle.

## Le workflow en 4 étapes

### 1. Enregistrer la dernière visite

Chaque rendez-vous honoré est noté avec la prestation réalisée : dans votre logiciel, dans un Google Sheets ou dans une base **Notion** qui sert de fichier clients. C’est la seule information indispensable.

### 2. Calculer la date de relance

Un scénario **Make** (ou **Zapier**) calcule automatiquement la date de relance selon la prestation : dernière coloration + 6 semaines = date de rappel.

### 3. Envoyer un message personnel, au bon moment

Le jour venu, le client reçoit un SMS ou un email court, avec le lien de réservation :

> Bonjour Julie, cela fait 6 semaines depuis votre couleur. On vous garde un créneau ? Réservez ici : [lien]. À bientôt au salon !

Le message est court, il cite la prestation et il contient le lien pour réserver tout de suite.

### 4. Ne relancer qu’une fois, et s’arrêter dès qu’il réserve

Si le client a déjà repris rendez-vous, aucun message ne part. Sinon, une seule relance plus tard, puis plus rien : vous restez attentionné, pas insistant.

## Aller un cran plus loin

- **Les anniversaires** : un petit message (« Joyeux anniversaire, profitez de -10 % ce mois-ci ») si votre client vous a donné sa date et accepté ce type de message.
- **Les clients perdus de vue** : au-delà de 3 ou 4 mois sans visite, un message différent : « Vous nous manquez ! »
- **Après un premier rendez-vous** : un remerciement et une [demande d’avis Google](/blog/posts/2026-10-29-restaurant-avis-google-automatiques/), avec les mêmes règles que pour les restaurants (on demande à tout le monde, sans récompense).

## Les règles à respecter

Une relance de fidélité est un message commercial : elle obéit aux règles de la prospection, contrôlées en France par la CNIL.

- **Vos clients existants** : vous pouvez en général leur proposer par email ou SMS des prestations similaires à celles qu’ils ont déjà achetées, **à condition** de les avoir informés au moment où vous avez recueilli leurs coordonnées et de leur permettre de refuser simplement.
- **Chaque message doit permettre de se désinscrire** facilement (« STOP » par SMS, lien par email). Et une désinscription doit être respectée immédiatement : l’automatisation s’en charge.
- **Pour les personnes qui ne sont pas clientes**, il faut leur accord préalable.

En cas de doute sur votre situation, le site de la CNIL détaille ces règles.

## Un exemple concret

Prenons un barbier qui note ses clients et leurs prestations dans une base Notion.

1. Après chaque visite, la prestation et la date sont enregistrées.
2. Make calcule la date de relance : 4 semaines pour une coupe, 3 pour une barbe.
3. Le jour venu, un SMS part avec le lien de réservation.
4. Si le client a déjà réservé, rien ne part.
5. Chaque lundi, le barbier reçoit la liste des clients sans visite depuis plus de 3 mois.

## Les pièges à éviter

**Un message générique.** « Venez nous voir ! » ne fonctionne pas. Le message doit citer la prestation et arriver au bon moment.

**Relancer quelqu’un qui a déjà réservé.** Rien de plus agaçant. Le scénario vérifie l’agenda avant chaque envoi.

**Promouvoir en permanence.** Une remise de temps en temps, oui. Une promotion à chaque message habitue vos clients à attendre la prochaine.

## Pour aller plus loin

La relance repose sur un bon fichier clients. Découvrez comment [tenir une fiche client numérique](/blog/posts/2026-10-29-salon-fiche-client-numerique/), et comment [éviter les rendez-vous non honorés](/blog/posts/2026-10-29-salon-rendez-vous-non-honores/).

Toutes nos solutions pour les salons sont sur la page [Automatisation pour salons de coiffure, instituts et bien-être](/services/salons-beaute-bien-etre/), et nos formules sur la page [nos packs](/services/).

Vous voulez que vos clients reviennent sans avoir à y penser ? [Parlons de votre salon](/contact/) : nous définissons ensemble les bons rythmes de relance pour vos prestations.
