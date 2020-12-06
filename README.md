
# Paris évènements


## Sommaire 
- A propos du projet
	- Technologies  
- Mise en place
  - Prérequis 
  - Installation 
- Fonctionnalités
- Scripts disponibles
- Documentation
- En savoir plus
- Auteur 
## A propos du projet
  
Le site web Paris évènements permet aux utilisateur de rechercher les évènements disponibles sur Paris et dans la région parisienne en fonction de filtres qu'ils peuvent choisir, mis à leur disposition.

[![readme-image.png](https://i.postimg.cc/05bZN1bp/readme-image.png)](https://postimg.cc/c6GfDj7H)
### Technologies

## Getting Started
### Prérequis 
- Node.js (>=10)
- Yarn
- git 

### Installation 

1. Cloner le répertoire
`git clone https://github.com/JulienDupontDev/paris-events.git`

2. Installer les packages NPM
**Si vous n'avez pas yarn :** 
`npm install -g yarn`

	 `yarn install` 
3. Lancement en mode développement
	`yarn start`
 

## Fonctionnalités

  

### Carte des évènements

La carte des évènements affiche une "pop-up" qui permet de voir tous les évènements disponibles à Paris et en couronnes sous forme de marqueurs qui en cliquant dessus affichent les informations de l'évènement.

### Filtres

Les filtres permettent de filtrer les résultats de recherche en fonction des critères disponibles.

Vous pourrez par exemple choisir une catégorie et une sous-catégorie, une date, un lieu, etc...

Vous pourrez aussi filtrer en tapant une recherche directement dans la barre de recherche.

  

### Pagination

Le nombre de résultats par page est limité à 10 dans un soucis d'optimisation.

Le site ira donc chercher les informations de 10 évènements maximum pour les afficher.

  

Les "barres" de pagination vous permettent d'afficher la page suivante ou d'aller au début ou à la fin des résultats disponibles.

  

### Résultats

Les résultats sont affichés sous forme de "carte" (card) avec quelques informations. Vous disposerez d'un bouton en savoir plus pour obtenir toutes les informations de l'évènement.

  

### Détails de l'évènement

Affiche une "pop-up" qui donne plus de détails concernant l'évènement sélectionné. Ce n'est pas une nouvelle page, vous pourrez fermer la "pop-up" et retourner à l'affichage de tous les résultats disponibles.



## Scripts disponibles

  

### `yarn start`

  

Lance l'application en mode développement<br/>

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir votre application dans le navigateur.

  

La page rechargera à chaque fois que vous ferez des modifications.

  

### `yarn test`

  

Lance le script de test en mode "Watch mode" <br  />

Voir les actions à propos des [scripts de test](https://facebook.github.io/create-react-app/docs/running-tests).

  

### `yarn build`

  

Construits l'application dans le dossier `build`.<br  />

Cela optimise et construit l'application en mode production pour la meilleure performance.

  

TLe build inclut tous les fichiers et les bons chemins<br  />

L'application est prête à être déployée !!

  

Pour en savoir plus sur le [déploiement](https://facebook.github.io/create-react-app/docs/deployment).

  

### `yarn eject`

  

**Note: cette opération n'est pas annulable. Une fois qu'on `eject`, on ne peut revenir en arrière**

  

Si vous n'êtes pas satisfait de la version de Build, vous pouvez exécuter la commande eject n'importe quand. Cette commande retirera le build de votre projet.

  

Cela copiera tous les projets de configuration à leur place initiale pour que vous ayez plein contrôle dessus.


## Documentation

La documentation généré grâce à jsdoc et better docs est accessible dans le dossier /docs/index.html.

Vous pourrez voir tous les composants de l'application dans un site clair.

## En savoir plus

  

Pour en savoir plus : [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

  

Pour apprendre React : [React documentation](https://reactjs.org/)

  

## Auteur

  

Julien Dupont
