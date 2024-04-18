# Stage 1: Build the React application
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with NGINX
FROM nginx:stable-alpine
RUN mkdir -p /etc/nginx/ssl # tee directory certide jaoks, see ei existi by default

COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy certid õigesse dir. see peab matchima nginx configa!!
COPY /etc/nginx/ssl/myserver.crt /etc/nginx/ssl/myserver.crt
COPY /etc/nginx/ssl/myserver.crt /etc/nginx/ssl/myserver.key

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
