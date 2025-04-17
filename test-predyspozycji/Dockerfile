FROM node:22 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/test-predyspozycji /usr/share/nginx/html

EXPOSE 80