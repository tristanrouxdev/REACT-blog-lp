# B2LP – Frontend React

Ce dépôt contient l’interface React du blog **B2LP**, qui consomme l’API Laravel située dans `../API-blog-lp`.

---

## Prérequis

- **Node.js** ≥ 16 et **npm** (ou **yarn**)  
- L’API Laravel doit être démarrée et accessible à l’URL renseignée dans la configuration (voir ci-dessous).

---

## Installation

1. **Cloner le repo**  
   ```bash
   git clone <URL_DE_TON_REPO_REACT>
   cd REACT-blog-lp
   ```

2. **Installer les dépendances**  
   ```bash
   npm install
   ```

3. **Copier le fichier d’environnement**  
   ```bash
   cp .env.example .env
   ```

4. **Configurer l’URL de l’API**  
   Ouvre `.env` et renseigne l’adresse de ton API Laravel :
   ```env
   REACT_APP_API_URL=http://127.0.0.1:8000/api
   ```
   > Si l’API tourne sur un autre port ou hôte, adapte cette valeur.

5. **Démarrer le serveur de développement**  
   ```bash
   npm start
   ```
   L’application s’ouvre automatiquement sur `http://localhost:3000`.

---

## Scripts disponibles

- **`npm start`**
  Lance l’app en mode développement (Hot Reload).

- **`npm run build`**
  Génère la version de production dans le dossier `build/`.

- **`npm test`**
  Lance les tests (si tu en ajoutes).

---

## Arborescence du projet

```
REACT-blog-lp/
├── public/               # index.html & assets statiques
├── src/
│   ├── components/       # Composants React (Feed, Post, Comment, etc.)
│   ├── styles/           # Fichiers CSS par composant
│   ├── App.js
│   ├── index.js
│   └── …
├── .env.example          # Exemple de variables d’environnement
├── package.json
└── README.md             # ← Vous êtes ici
```

---

## Fonctionnalités

- **Liste des billets** récupérés depuis l’API  
- **Affichage des commentaires** d’un billet (bouton “Afficher / Masquer”)  
- **Ajout de commentaire** (nécessite d’être connecté via Sanctum + Bearer Token)  
- **Formulaire** d’inscription et de connexion

---

## Conseils

- Après chaque modification de `.env`, **stop** et **relance** le serveur React (`npm start`).  
- En production, génère d’abord le build :
  ```bash
  npm run build
  ```
  puis sert le dossier `build/` depuis un serveur (Nginx, Apache, surge.sh…).

---

## Auteurs

- Tristan ROUX – Développeur fullstack  

---

Merci d’utiliser ce projet ! N’hésite pas à poser des issues si besoin.  
