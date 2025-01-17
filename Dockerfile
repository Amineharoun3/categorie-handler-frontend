# Utiliser une version légère de Node.js
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour optimiser les couches Docker
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code Angular dans le conteneur
COPY . /app

# Exposer le port Angular (4200)
EXPOSE 4200

# Lancer l'application Angular en mode développement
CMD ["npm", "start"]
