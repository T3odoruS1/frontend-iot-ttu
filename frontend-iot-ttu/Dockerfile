# Stage 1: Build the React application
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY myserver.crt /etc/nginx/ssl/myserver.crt
COPY myserver.key /etc/nginx/ssl/myserver.key
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
