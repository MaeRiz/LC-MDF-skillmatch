# SkillMatch

SkillMatch est une API Rest développée avec **Express / TypeScript** permettant de mettre en relation des **freelances** et des **entreprises** autour de projets, en fonction des compétences et du TJM.

---

### 📌 Prérequis

Avant de lancer le projet, assure-toi d'avoir installé :

-   **Node.js** ≥ 18.x
-   **npm** ≥ 9.x

---

### 📦 Modules installés

-   **express**
-   **dotenv**
-   **@prisma/client**
-   **typescript**
-   **nodemon**
-   **ts-node-dev**
-   **prisma**

---

### ⚙️ Installation du projet

1. Cloner le dépôt

```bash
git clone https://github.com/MaeRiz/LC-MDF-skillmatch.git
cd skillmatch
```

2. Installer les dépendances

```bash
npm install
```

3. Créer un fichier `.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/skillmatch"
```

---

### 🗄️ Base de données (Prisma)

#### Lancer PostgreSql (conteneur)

```bash
docker compose up
```

#### Générer le client Prisma

```bash
npx prisma generate
```

#### Appliquer les migrations

```bash
npx prisma deploy
```

---

### ▶️ Lancer le serveur

```bash
npm start
```

Le serveur sera accessible à l’adresse :

```
http://localhost:8000
```

---

### 📡 Endpoints API

#### Freelances

##### ➕ Créer un freelance

```http
POST /freelances
```

```json
{
	"nom": "Johnatan Bayer",
	"email": "joh0na.bayer@domain.com",
	"skills": ["Python", "React", "Postman", "Angular"],
	"tjm": 130
}
```

##### 📄 Lister tous les freelances

```http
GET /freelances
```

##### 🔍 Récupérer un freelance par ID

```http
GET /freelances/{id}
```

##### 🤝 Trouver des projets disponible pour un freelance

```http
GET /freelances/{id}/projets-compatibles
```

##### 📩 Postuler à un projet

```http
POST /freelances/{freelanceId}/postuler/{projectId}
```

---

#### Entreprises

##### ➕ Créer une entreprise

```http
POST /entreprises
```

```json
{
	"nom": "Microsoft",
	"secteur": "IT"
}
```

##### 📄 Lister toutes les entreprises

```http
GET /entreprises
```

##### 🔍 Récupérer une entreprise par ID

```http
GET /entreprises/{id}
```

---

#### Projets

##### ➕ Créer un projet pour une entreprise

```http
POST /entreprises/{entrepriseId}/projects
```

```json
{
	"titre": "SoftTunes",
	"description": "Application opensource pour écouter de la musique gratuitement.",
	"skillsRequis": ["Python", "React", "Postman"],
	"budgetMaxTjm": 125,
	"entrepriseId": 1
}
```

##### 📄 Lister les projets d’une entreprise

```http
GET /entreprises/{entrepriseId}/projects
```

##### 🎯 Lister les candidats compatibles pour un projet

```http
GET /entreprises/{entrepriseId}/projects/{projectId}/candidats-compatibles
```
