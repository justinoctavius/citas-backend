# Establece la imagen base
FROM node:14-alpine

# Define el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de código fuente al directorio de trabajo
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto que la aplicación utiliza
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
