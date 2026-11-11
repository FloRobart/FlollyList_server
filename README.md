# FlollyList — API

# Table des matières

<details>
<summary>Expand contents</summary>

- [FlollyList — API](#flollylist--api)
- [Table des matières](#table-des-matières)
- [Présentation](#présentation)
- [Fonctionnalités](#fonctionnalités)
- [Sécurité](#sécurité)
- [Technologies utilisées](#technologies-utilisées)
- [Développement](#développement)
- [Tests](#tests)
- [Production](#production)
- [Auteur](#auteur)
- [Report de bug et suggestions](#report-de-bug-et-suggestions)
- [License](#license)

</details>

# Présentation

FlollyList est une application qui permet de gérer facilement les cadeaux à offrir à ses proches : la liste de ses proches, et pour chacun les cadeaux de chaque année, avec leur prix.

Ce dépôt est son API REST. Elle ne contient rien sur la base de données, qui vit dans `flollylist-database` (migrations, image de migrations, rôle de l'API), ni sur l'authentification, assurée par [Floraccess](https://github.com/FloRobart/FlorAccess_server).

# Fonctionnalités

| Route | Rôle |
|---|---|
| `GET /peoples` | Les proches de l'utilisateur |
| `POST /peoples` | Ajouter un proche |
| `PUT /peoples/:id` | Modifier un proche |
| `DELETE /peoples/:id` | Supprimer un proche, avec tous ses cadeaux |
| `GET /gifts` | Les cadeaux de l'utilisateur, pour tous ses proches |
| `POST /gifts` | Ajouter un cadeau à un proche |
| `PUT /gifts/:id` | Modifier un cadeau, ou le passer à un autre proche |
| `DELETE /gifts/:id` | Supprimer un cadeau |

Une liste vide est renvoyée en `200` avec `[]`. En développement, toute la documentation est sur `/api-docs` (Swagger).

# Sécurité

- **L'utilisateur vient toujours de Floraccess.** Chaque requête envoie le JWT à Floraccess (`GET /users`, 5 secondes au plus), et l'API ne lit jamais d'utilisateur dans le corps de la requête.
- **Un utilisateur n'atteint que ses propres données.** Chaque requête SQL filtre sur son `user_id`. Un cadeau ne peut être rattaché qu'à un proche du même utilisateur : la requête le vérifie, et la base le garantit une seconde fois par une clé étrangère sur `(people_id, user_id)`.
- **Le rôle de base de données de l'API ne peut que lire et écrire des lignes.** Une injection SQL ne pourrait ni modifier le schéma ni toucher aux migrations. Toutes les requêtes sont paramétrées.
- **Les entrées sont validées par zod**, et les sorties aussi, avant d'être envoyées. Les messages d'erreur inattendus ne sont jamais renvoyés au client.
- **Limites** : un nombre de requêtes par IP, 500 proches et 10 000 cadeaux par utilisateur, pour qu'un seul compte ne puisse pas remplir la base.
- **En production** : image sans shell ni npm, système de fichiers en lecture seule, utilisateur non-root, aucun port publié (Traefik seul l'atteint), mot de passe de la base lu depuis un secret Docker, Swagger désactivé, en-têtes de sécurité (Helmet).

Pour signaler une faille : voir [SECURITY.md](SECURITY.md).

# Technologies utilisées

- Langage : [TypeScript](https://www.typescriptlang.org/), sur [Node.js](https://nodejs.org/) 24
- Framework : [ExpressJS](https://www.npmjs.com/package/express) 5
- Validation : [zod](https://zod.dev/)
- Base de données : [PostgreSQL](https://www.postgresql.org/) 18, avec [node postgres](https://www.npmjs.com/package/pg)
- Tests : [Jest](https://jestjs.io/)
- Déploiement : [Docker](https://www.docker.com/), images [Docker Hardened Images](https://www.docker.com/products/hardened-images/)

# Développement

1. Démarrer la base de développement, depuis le dossier de `flollylist-database` (voir son README) :

    ```bash
    docker compose -f docker-compose.dev.yml up -d
    ```

2. Dans ce dépôt, créer le fichier d'environnement :

    ```bash
    cp .env.example .env
    ```

3. Installer les dépendances :

    ```bash
    npm install
    ```

4. Démarrer l'API, qui se recharge à chaque modification de `src/` :

    ```bash
    npm run dev-docker
    ```

- API : <http://localhost:26005>
- Documentation Swagger : <http://localhost:26005/api-docs>

L'API joint la base par le réseau `flollylist-net`, et Floraccess sur le port `26001` de la machine (`host.docker.internal`). L'application web de développement doit être sur <http://localhost:26006>, sinon ajouter son adresse à `CORS_ALLOWED_ORIGINS`.

# Tests

```bash
npm test
```

```bash
npm run typecheck
```

La CI ([Github-ci](https://github.com/FloRobart/github-ci)) lance `lint`, `format:check`, `typecheck` et `test` sur chaque pull request, puis construit l'image Docker. À chaque merge sur `main`, elle publie l'image `florobart/flollylist-api` (`<version>` et `latest`) sur Docker Hub et GHCR.

# Production

L'API est déployée par `flollylist-wrapper`, avec la base, les migrations, l'application web et Traefik : voir son README. Elle se connecte avec le rôle `flollylist_api`, jamais avec le propriétaire de la base.

Le [docker-compose.yml](docker-compose.yml) de ce dépôt est celui de production : il ne publie aucun port et lit son mot de passe dans `secrets/db_password`.

# Auteur

FlollyList est un projet open-source développé uniquement par [Floris Robart](https://florobart.github.io/)

# Report de bug et suggestions

Si vous découvrez une erreur, quelle qu'elle soit, cela peut être une faute de frappe ou d'orthographe, une erreur de calcul, une erreur de conception, un bug qui empêche le bon fonctionnement de l'application, ou tout autre problème, merci de me la signaler par mail à l'adresse [florobart.github@gmail.com](mailto:florobart.github@gmail.com). Toutes les erreurs, quelle que soit leur nature ou leur importance, seront traitées le plus rapidement possible.

Si vous avez une **suggestion**, une **idée**, une **amélioration**, ou une **demande de fonctionnalité**, merci de me la communiquer par mail à l'adresse [florobart.github@gmail.com](mailto:florobart.github@gmail.com). Toutes les suggestions, quelle que soit leur nature ou leur importance, seront étudiées et prises en compte dans la mesure du possible.

# License

FlollyList est un projet open-source sous licence [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0).
