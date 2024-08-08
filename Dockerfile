# Wähle ein Basis-Image mit Node.js
FROM node:18 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und package-lock.json
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den gesamten Quellcode
COPY . .

# Baue die Anwendung
RUN npm run build

# Nutze ein Nginx-Image, um die Anwendung auszuliefern
FROM nginx:alpine

# Kopiere die gebauten Dateien ins Nginx-Verzeichnis
COPY --from=build /app/build /usr/share/nginx/html

# Exponiere Port 80
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]
