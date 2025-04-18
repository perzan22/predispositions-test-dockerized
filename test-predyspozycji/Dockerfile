# Dockerfile builds image of angular app

# Image based on node:22 image

FROM node:22 as build

WORKDIR /app

COPY package*.json ./

# install dependencies and build app

RUN npm install
COPY . .
RUN npm run build --configuration=production

# nginx image used for proxy server

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/test-predyspozycji /usr/share/nginx/html

EXPOSE 80