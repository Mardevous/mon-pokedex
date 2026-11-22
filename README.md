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
