# Stage 1: Build the React application
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Stage 2: Serve the application using serve
FROM node:alpine

# Install serve to serve the static files
RUN npm install -g serve

# Copy the built app from the previous stage
COPY --from=build-stage /app/build /app

# Set the working directory to where the build artifacts live
WORKDIR /app

# Expose the port serve listens on
EXPOSE 8000

# Command to run serve
CMD ["serve", "-s", ".", "-l", "8000"]


# Stage 2: Serve the app with NGINX
#FROM nginx:stable-alpine
#COPY --from=build-stage /app/build /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#EXPOSE 443

#CMD ["nginx", "-g", "daemon off;"]
