## Optimisation des performances

### Chargement différé des composants

L'application utilise `React.lazy()` et `Suspense` pour optimiser le chargement des pages.

**Fonctionnement :**
- `React.lazy()` permet de charger les modules des pages uniquement lorsqu'ils sont nécessaires.
- `Suspense` affiche un message temporaire pendant le chargement.
- Les pages Home, PokeDetails, AddPokemon et MesPokemons sont chargées à la demande.

**Avantages :**
- Réduction potentielle de la taille du JavaScript chargé initialement.
- Amélioration possible du temps de chargement initial.
- Séparation du code en plusieurs fichiers grâce à Vite.

### Tests automatisés et intégration continue

Les tests sont réalisés avec Jest et React Testing Library.

Ils permettent notamment de vérifier :
- Le calcul de la pagination.
- La validation des données d'un Pokémon.
- L'affichage et les interactions du formulaire.
- L'envoi simulé des données vers le backend.

Un workflow GitHub Actions exécute automatiquement les tests lors des `push` et des `pull requests` vers la branche `main`.

### Gestion de l'état React

L'application utilise les hooks natifs `useState` et `useEffect` pour gérer les données, les états de chargement, les erreurs et la pagination.

Le choix de ne pas utiliser de bibliothèque de gestion d'état globale comme Zustand repose sur le principe KISS (*Keep It Simple, Stupid*).

Les pages `Home` et `MesPokemons` utilisent des sources de données différentes et leurs états sont indépendants.

Cette architecture permet de conserver un code simple, lisible et facile à maintenir. Une solution de gestion d'état globale pourra être envisagée si de nouvelles fonctionnalités nécessitent le partage de données entre plusieurs composants.

## Gestion d'état moderne — Zustand

L'application utilise Zustand pour gérer l'état global de la pagination du Pokédex.

Un store `usePokemonStore.js` contient :
- `page` : numéro de la page actuellement sélectionnée.
- `setPage` : fonction permettant de modifier la page.

Cette approche permet de conserver la page sélectionnée lorsqu'un utilisateur navigue vers la fiche d'un Pokémon, puis revient à l'accueil.

Les autres états (`pokemons`, `isLoading`, `erreur`) restent gérés localement avec `useState`, car ils ne nécessitent pas d'être partagés entre plusieurs composants.

**Justification technique :** Zustand permet de centraliser uniquement les données qui doivent être partagées, sans complexifier inutilement l'application.

## Stratégie de rendu — Client-Side Rendering (CSR)

Le Pokédex utilise une stratégie de rendu côté client, appelée *Client-Side Rendering* (CSR).

Le navigateur reçoit une page HTML initiale, puis React exécute le JavaScript nécessaire pour afficher l'interface.

Les données des Pokémon sont récupérées depuis PokéAPI grâce à Axios, puis affichées dynamiquement.

React Router permet de naviguer entre les différentes pages sans rechargement complet du document HTML.

### Pourquoi avoir choisi CSR ?

- L'application est interactive et repose sur React.
- Les données sont récupérées dynamiquement depuis une API REST.
- Les utilisateurs peuvent naviguer entre les pages sans rechargement complet.
- Cette stratégie est adaptée à une application monopage (*Single Page Application* ou SPA).

### Optimisation du rendu

L'application utilise également `React.lazy()` et `Suspense` pour charger les modules des pages uniquement lorsqu'ils deviennent nécessaires.

Cette technique permet de réduire potentiellement la quantité de JavaScript chargée au démarrage.

## Architecture frontend — Principes d'Atomic Design et de Feature-Sliced Design

Le projet adopte une architecture React organisée en dossiers selon les responsabilités des fichiers.

### Organisation des dossiers

```text
src/
├── components/
│   ├── Pokemon.jsx
│   └── Pagination.jsx
├── pages/
│   ├── Home.jsx
│   ├── PokeDetails.jsx
│   ├── AddPokemon.jsx
│   └── MesPokemons.jsx
├── services/
│   ├── api.js
│   └── backendApi.js
├── store/
│   └── usePokemonStore.js
├── utils/
│   ├── pagination.js
│   └── validationPokemon.js
├── tests/
├── App.jsx
└── main.jsx
```

### Principes d'Atomic Design

L'application applique certains principes d'Atomic Design en séparant les éléments réutilisables des pages complètes.

- **Composants réutilisables :** `Pokemon.jsx` et `Pagination.jsx`.
- **Pages :** `Home.jsx`, `PokeDetails.jsx`, `AddPokemon.jsx` et `MesPokemons.jsx`.

Les pages assemblent plusieurs éléments pour construire l'interface utilisateur.

Il ne s'agit pas d'une implémentation stricte d'Atomic Design avec des dossiers `atoms`, `molecules`, `organisms`, `templates` et `pages`, mais d'une organisation qui reprend son principe de composition.

### Principes de Feature-Sliced Design

Le projet sépare également plusieurs responsabilités :

- `pages/` : interfaces associées aux routes.
- `components/` : composants réutilisables.
- `services/` : communication avec les API.
- `store/` : gestion de l'état global.
- `utils/` : fonctions utilitaires indépendantes.
- `tests/` : vérification du fonctionnement de l'application.

Cette séparation facilite la lecture, la maintenance et les tests du code.

L'application n'utilise cependant pas une architecture Feature-Sliced Design complète, qui nécessiterait une organisation plus poussée par fonctionnalités et couches.

### Justification du choix architectural

Cette organisation a été retenue pour conserver un projet simple et évolutif.

Elle respecte le principe KISS en évitant une architecture trop complexe pour une application de cette taille, tout en favorisant la réutilisation des composants et la séparation des responsabilités.