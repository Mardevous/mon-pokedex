# Mon Pokédex — Application React Full Stack

## 1. Présentation du projet

Mon Pokédex est une application web développée dans le cadre d'un TP de développement frontend avancé.

L'objectif est de mettre en pratique les concepts fondamentaux et avancés de React, tout en développant une API REST avec Node.js et Express.

Le projet comprend deux parties :

- Un frontend React permettant de consulter les Pokémon officiels depuis PokéAPI.
- Un backend Express permettant d'enregistrer, de consulter et de supprimer des Pokémon personnalisés.

L'application est déployée en production avec Vercel pour le frontend et un VPS Debian pour le backend.

### Liens du projet

- **GitHub :** https://github.com/Mardevous/mon-pokedex
- **Frontend :** https://mon-pokedex-8evjqi27s-fassil.vercel.app/
- **API backend :** https://180.149.198.73/pokemon

## 2. Fonctionnalités

### Pokédex officiel

- Affichage des Pokémon depuis PokéAPI.
- Affichage du nom, de l'image et des types.
- Consultation d'une fiche détaillée.
- Navigation entre les pages avec React Router.
- Pagination avec boutons précédent et suivant.
- Gestion du chargement et des erreurs.

### Gestion des Pokémon personnalisés

- Affichage des Pokémon enregistrés.
- Ajout d'un Pokémon avec son nom et son type.
- Validation des données du formulaire.
- Suppression d'un Pokémon.
- Persistance des données dans un fichier JSON.
- Communication entre React et Express avec Axios.

## 3. Technologies utilisées

| Technologie | Utilisation |
|---|---|
| React | Création de l'interface utilisateur |
| Vite | Développement et compilation du frontend |
| JavaScript | Logique applicative |
| React Router | Navigation entre les pages |
| Axios | Requêtes HTTP |
| Zustand | Gestion de l'état global de pagination |
| Node.js | Exécution du backend |
| Express | Création de l'API REST |
| JSON | Stockage des Pokémon personnalisés |
| Jest | Tests automatisés |
| React Testing Library | Tests des composants |
| GitHub Actions | Intégration continue |
| Vercel | Hébergement du frontend |
| Debian VPS | Hébergement du backend |
| PM2 | Gestion du processus Node.js |
| Nginx | Reverse proxy HTTPS |
| Let's Encrypt / Certbot | Certificat TLS et renouvellement |

## 4. Architecture générale

L'application utilise une architecture frontend/backend séparée.

```text
Utilisateur
    |
    v
Frontend React / Vite
    |
    |-- PokéAPI
    |   └── Pokémon officiels
    |
    └── API Express
          |
          v
       HTTPS (443)
          |
          v
        Nginx
          |
          v
     Express (3000)
          |
          v
      pokemons.json
```

Le frontend est hébergé sur Vercel.

Le backend est hébergé sur un VPS Debian. Nginx reçoit les requêtes HTTPS et les transmet au serveur Express.

PM2 maintient le processus Node.js en fonctionnement.

## 5. Organisation du frontend

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

### Rôle des dossiers

- `components/` : composants réutilisables.
- `pages/` : pages de l'application.
- `services/` : communication avec les API.
- `store/` : état global avec Zustand.
- `utils/` : fonctions utilitaires.
- `tests/` : tests automatisés.

Cette organisation permet de séparer les responsabilités et de faciliter la maintenance.

## 6. Backend Node.js / Express

Le backend expose une API REST permettant de gérer les Pokémon personnalisés.

### Routes disponibles

| Méthode | Route | Fonction |
|---|---|---|
| GET | `/` | Message de bienvenue |
| GET | `/pokemon` | Récupérer les Pokémon |
| POST | `/pokemon` | Ajouter un Pokémon |
| DELETE | `/pokemon/:id` | Supprimer un Pokémon |

### Exemple de Pokémon

```json
{
  "id": "identifiant-unique",
  "name": "Pikachu",
  "type": "Électrique"
}
```

Les identifiants sont générés avec `randomUUID()`.

### Stockage des données

Le backend utilise le module `fs/promises` de Node.js pour lire et écrire les données dans `pokemons.json`.

Cette solution a été retenue pour sa simplicité et son adéquation avec les objectifs pédagogiques du TP.

Pour une application destinée à un grand nombre d'utilisateurs, une base de données serait plus adaptée, notamment pour gérer les accès concurrents.

## 7. Communication avec les API

L'application utilise deux services Axios.

### PokéAPI

Le service `api.js` permet de récupérer les Pokémon officiels et leurs informations détaillées.

### Backend personnel

Le service `backendApi.js` communique avec l'API Express.

```javascript
import axios from 'axios'

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
})

export default backendApi
```

La variable `VITE_BACKEND_URL` permet de définir une adresse différente selon l'environnement.

En développement, l'application peut communiquer avec `localhost:3000`.

En production, elle utilise l'adresse HTTPS du VPS.

## 8. Gestion de l'état avec Zustand

L'application utilise Zustand pour centraliser l'état de pagination.

Le store `usePokemonStore.js` contient notamment :

- `page` : numéro de page sélectionné.
- `setPage` : fonction permettant de modifier cette page.

Cette solution permet de conserver la page sélectionnée lorsque l'utilisateur consulte une fiche Pokémon puis revient à l'accueil.

Les autres états restent gérés localement avec les hooks React :

- `useState` pour les données, erreurs et chargements.
- `useEffect` pour déclencher les appels API.

### Justification

Zustand est utilisé uniquement lorsqu'un état doit être partagé ou conservé entre plusieurs composants.

Ce choix permet d'éviter une gestion globale inutilement complexe.

## 9. Optimisation des performances

### React.lazy et Suspense

L'application utilise `React.lazy()` et `Suspense` pour charger les pages à la demande.

Les pages concernées sont notamment :

- Home
- PokeDetails
- AddPokemon
- MesPokemons

`React.lazy()` permet de différer le chargement du code d'une page.

`Suspense` permet d'afficher un contenu temporaire pendant le chargement.

### Avantages

- Réduction potentielle du JavaScript initial.
- Découpage du code en plusieurs modules.
- Chargement des pages au moment où elles deviennent nécessaires.

Cette technique est adaptée à une application React comportant plusieurs routes.

## 10. Stratégie de rendu — Client-Side Rendering

Le Pokédex utilise le **Client-Side Rendering (CSR)**.

Le navigateur reçoit un document HTML initial, puis React construit l'interface à l'aide de JavaScript.

Les données sont récupérées depuis les API et affichées dynamiquement.

React Router permet de naviguer entre les pages sans rechargement complet du document HTML.

### Pourquoi utiliser CSR ?

- L'application est interactive.
- Elle consomme des API REST.
- Elle utilise une navigation de type SPA.
- Les données sont récupérées dynamiquement.

Le CSR constitue donc un choix cohérent avec les besoins du projet.

## 11. Qualité du code et principe KISS

Le projet applique le principe KISS (*Keep It Simple, Stupid*), qui consiste à privilégier des solutions simples et compréhensibles.

Ce principe se retrouve notamment dans :

- La séparation des composants React.
- La centralisation des appels Axios.
- L'utilisation de fonctions utilitaires.
- La gestion locale des états lorsque cela suffit.
- L'utilisation ciblée de Zustand.
- Le stockage JSON adapté à un projet pédagogique.

L'objectif est de conserver un code lisible, maintenable et évolutif sans ajouter de complexité inutile.

## 12. Architecture Atomic Design et Feature-Sliced Design

Le projet reprend certains principes d'Atomic Design et de Feature-Sliced Design.

### Atomic Design

Les composants réutilisables, comme `Pokemon.jsx` et `Pagination.jsx`, sont séparés des pages complètes.

Les pages assemblent ces composants pour construire l'interface.

L'application ne suit pas strictement la hiérarchie `atoms`, `molecules`, `organisms`, `templates` et `pages`.

Elle reprend principalement le principe de composition et de réutilisation.

### Feature-Sliced Design

Le projet sépare les responsabilités entre les pages, les composants, les services, le store et les utilitaires.

Cette organisation facilite la compréhension du code.

Il ne s'agit cependant pas d'une implémentation complète de Feature-Sliced Design, qui nécessiterait une organisation plus poussée par fonctionnalités.

### Justification

Une architecture simplifiée a été retenue afin de respecter le principe KISS tout en conservant une bonne séparation des responsabilités.

## 13. Tests automatisés

Le projet utilise Jest et React Testing Library.

Les tests portent notamment sur :

- Le calcul de la pagination.
- La validation des données d'un Pokémon.
- L'affichage des composants.
- Les interactions avec le formulaire.
- La simulation des requêtes envoyées au backend.

### Exécuter les tests

```bash
npm test
```

### Intégration continue

GitHub Actions permet d'exécuter automatiquement les vérifications configurées dans le workflow lors des événements Git concernés.

Cette automatisation permet de détecter certaines régressions avant la mise en production.

## 14. Installation locale

### Prérequis

- Node.js
- npm
- Git

### Cloner le projet

```bash
git clone https://github.com/Mardevous/mon-pokedex.git
cd mon-pokedex
```

### Installer les dépendances frontend

```bash
npm install
```

### Démarrer React

```bash
npm run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur.

### Démarrer le backend

Dans un second terminal :

```bash
cd backend
npm install
node server.js
```

Le backend doit être accessible sur :

```text
http://localhost:3000/pokemon
```

### Configuration locale

Créer un fichier `.env.local` à la racine du frontend :

```env
VITE_BACKEND_URL=http://localhost:3000
```

Ne pas placer de mots de passe ou de secrets dans les variables commençant par `VITE_`, car elles sont exposées au navigateur.

## 15. Déploiement du frontend sur Vercel

Le frontend est hébergé sur Vercel.

Le projet Vercel est relié au dépôt GitHub afin de faciliter les déploiements.

### Configuration de production

Dans les variables d'environnement Vercel :

**Nom :**

```text
VITE_BACKEND_URL
```

**Valeur :**

```text
https://180.149.198.73
```

Cette variable est de type `Config`, car l'adresse de l'API est publique.

### Compilation

Vercel compile le frontend avec Vite.

Les variables `VITE_` sont intégrées au JavaScript lors de cette compilation.

Une modification des variables nécessite donc un nouveau déploiement pour être prise en compte.

## 16. Déploiement du backend sur VPS Debian

Le backend est hébergé sur un serveur VPS Debian.

### Installation

Le dépôt GitHub est cloné dans :

```text
/var/www/mon-pokedex
```

Le backend se trouve dans :

```text
/var/www/mon-pokedex/backend
```

Les dépendances Node.js sont installées avec :

```bash
npm install
```

### Gestion du processus avec PM2

PM2 permet de maintenir le backend actif indépendamment de la session SSH.

Le processus est nommé :

```text
pokedex-api
```

Commandes utiles :

```bash
pm2 status
pm2 restart pokedex-api
pm2 logs pokedex-api
pm2 save
```

PM2 facilite le redémarrage, la supervision et la consultation des journaux du serveur.

## 17. Configuration Nginx

Nginx est utilisé comme reverse proxy.

Il reçoit les requêtes HTTPS sur le port 443 et les transmet à Express sur le port 3000.

### Chemin de configuration

```text
/etc/nginx/sites-available/mon-pokedex-api
```

### Principe

```text
Navigateur
    |
    | HTTPS : 443
    v
  Nginx
    |
    | HTTP local : 3000
    v
  Express
```

Le reverse proxy permet de centraliser la gestion HTTPS et de ne pas exposer directement Express sur Internet.

### Commandes de maintenance

Vérifier la configuration :

```bash
nginx -t
```

Recharger Nginx :

```bash
systemctl reload nginx
```

## 18. HTTPS et certificat Let's Encrypt

L'API utilise un certificat TLS délivré par Let's Encrypt directement pour l'adresse IP du VPS.

Aucun nom de domaine supplémentaire n'est nécessaire.

### Outil utilisé

Certbot est installé dans un environnement Python isolé :

```text
/opt/certbot
```

### Obtention du certificat

La demande a été effectuée avec la méthode `webroot` et le profil `shortlived`.

```bash
/opt/certbot/bin/certbot certonly \
  --webroot \
  -w /var/www/letsencrypt \
  --ip-address 180.149.198.73 \
  --preferred-challenges http \
  --required-profile shortlived
```

Le profil `shortlived` est nécessaire pour les certificats d'adresse IP utilisés dans cette configuration.

### Fichiers du certificat

```text
/etc/letsencrypt/live/180.149.198.73/fullchain.pem
/etc/letsencrypt/live/180.149.198.73/privkey.pem
```

La clé privée reste sur le VPS et ne doit jamais être ajoutée au dépôt GitHub.

### Renouvellement automatique

Les certificats utilisés sont de courte durée.

Un service et un timer systemd ont été configurés pour lancer régulièrement Certbot.

```text
certbot-renew.service
certbot-renew.timer
```

Le timer prévoit quatre vérifications quotidiennes.

Le service lance Certbot et recharge Nginx après un renouvellement réussi.

### Vérification du timer

```bash
systemctl list-timers --all | grep certbot-renew
```

### Simulation de renouvellement

```bash
/opt/certbot/bin/certbot renew --dry-run
```

Cette simulation a été exécutée avec succès.

Le renouvellement réel doit continuer à être surveillé.

## 19. Sécurisation du backend

### Isolation du port 3000

Le backend Express est configuré sur le VPS pour écouter uniquement sur l'adresse locale :

```javascript
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Serveur démarré sur le port ${PORT}`)
})
```

Cela empêche les connexions directes depuis Internet vers Express sur le port 3000.

Nginx reste le point d'entrée public sur HTTPS.

### Vérification réseau

La commande suivante permet de contrôler l'adresse d'écoute :

```bash
ss -tlnp | grep ':3000'
```

Résultat attendu :

```text
127.0.0.1:3000
```

### Autres précautions

- Ne pas exposer les clés privées TLS.
- Ne pas publier de secrets dans GitHub.
- Maintenir les dépendances à jour.
- Surveiller les journaux PM2 et Nginx.
- Conserver une copie des données JSON.
- Restreindre les origines CORS si nécessaire.
- Prévoir une authentification avant d'ouvrir l'API à de véritables utilisateurs.

L'API actuelle est adaptée à une démonstration pédagogique. Elle n'implémente pas encore un contrôle d'accès complet.

## 20. Vérifications en production

Les opérations suivantes ont été testées depuis le frontend hébergé sur Vercel :

| Test | Résultat |
|---|---|
| Accès au site | Validé |
| Affichage des Pokémon officiels | Validé |
| Pagination | Vérifiée visuellement |
| Connexion à l'API Express | Validée |
| GET `/pokemon` | Validé |
| POST `/pokemon` | Validé |
| DELETE `/pokemon/:id` | Validé |
| Connexion HTTPS | Validée |
| Accès local uniquement au port 3000 | Validé |
| Simulation de renouvellement TLS | Validée |

La communication entre le frontend Vercel et le backend VPS a été confirmée depuis les outils de développement du navigateur.

## 21. Limites et améliorations possibles

Le projet remplit ses objectifs pédagogiques, mais plusieurs améliorations peuvent être envisagées :

- Remplacer le stockage JSON par une base de données.
- Ajouter une authentification utilisateur.
- Protéger les routes de modification.
- Restreindre la configuration CORS.
- Ajouter davantage de tests automatisés.
- Améliorer l'interface et son accessibilité.
- Mettre en place des sauvegardes automatiques.
- Automatiser davantage le déploiement du backend.

## 22. Conclusion

Ce projet m'a permis de mettre en pratique plusieurs compétences du développement web full stack.

J'ai notamment appris à :

- Construire une interface avec React.
- Consommer des API REST avec Axios.
- Organiser une application en composants et pages.
- Utiliser React Router et Zustand.
- Écrire des tests automatisés.
- Développer une API avec Express.
- Manipuler des données JSON.
- Déployer un frontend sur Vercel.
- Héberger un backend sur un VPS Debian.
- Configurer PM2, Nginx et HTTPS.
- Sécuriser les communications entre le frontend et le backend.

Le Pokédex constitue ainsi une première application full stack déployée et accessible en ligne, avec une séparation claire entre l'interface utilisateur et la logique serveur.