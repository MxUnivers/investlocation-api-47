# Utilisation de l'image Node.js officielle
FROM node:18

# Répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de l'application
COPY package*.json ./
RUN npm install --production

# Copier tout le reste du code
COPY . .

# Exposer le port de l'application
EXPOSE 8080

# Démarrer l'application
CMD ["npm", "start"]
