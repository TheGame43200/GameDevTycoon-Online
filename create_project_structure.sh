#!/bin/bash

# Créer les dossiers principaux
mkdir -p docker image nginx scripts shared

# Créer le dossier docker et ses fichiers
cat > docker/Dockerfile.backend << EOL
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
EOL

cat > docker/Dockerfile.frontend << EOL
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
EOL

# Créer le fichier nginx.conf
cat > nginx/nginx.conf << EOL
events {
    worker_connections 1024;
}

http {
    upstream frontend {
        server frontend:3000;
    }

    upstream backend {
        server backend:5000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://frontend;
        }

        location /api {
            proxy_pass http://backend;
        }
    }
}
EOL

# Créer un script de backup dans le dossier scripts
cat > scripts/backup_database.sh << EOL
#!/bin/bash
# Script de backup de la base de données
# À implémenter selon vos besoins
EOL

chmod +x scripts/backup_database.sh

# Créer un fichier de constantes partagées
cat > shared/constants.js << EOL
// Constantes partagées entre le frontend et le backend
const GAME_GENRES = ['Action', 'Adventure', 'RPG', 'Strategy', 'Simulation'];
const MAX_EMPLOYEES = 50;

module.exports = {
    GAME_GENRES,
    MAX_EMPLOYEES
};
EOL

# Créer le fichier .gitignore à la racine
cat > .gitignore << EOL
# Dependances
node_modules/

# Fichiers de build
/build

# Fichiers d'environnement
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Fichiers du système d'exploitation
.DS_Store
Thumbs.db

# Fichiers de l'éditeur
.vscode/
.idea/
*.swp
*.swo

# Fichiers de configuration Docker
docker-compose.override.yml

# Dossiers de données
/data
EOL

# Créer le fichier docker-compose.yml à la racine
cat > docker-compose.yml << EOL
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: ../docker/Dockerfile.frontend
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: ../docker/Dockerfile.backend
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/gamedevtycoon
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - frontend
      - backend

volumes:
  mongo-data:
EOL

# Créer un README.md basique
cat > README.md << EOL
# Game Dev Tycoon Online

Un jeu de simulation de développement de jeux vidéo en ligne.

## Installation

1. Clonez ce dépôt
2. Installez Docker et Docker Compose
3. Exécutez \`docker-compose up --build\`

## Développement

- Le frontend est accessible sur http://localhost:3000
- Le backend est accessible sur http://localhost:5000
- La base de données MongoDB est accessible sur localhost:27017

## Licence

Copyright (c) 2024 [Votre Nom]
EOL

echo "Structure du projet créée avec succès !"