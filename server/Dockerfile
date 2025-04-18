# Dockerfile builds image of backend server

# Image build from node base image
FROM node:22

WORKDIR /server

# Install all necessary libraries
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

# Start server
CMD ["npm", "run", "server"]





