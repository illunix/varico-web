# Base stage for common configurations
FROM node:alpine3.19 as base
USER app
WORKDIR /app
EXPOSE 8080

# Build stage for building the Angular application
FROM node:alpine3.19 as build
COPY ["package*.json", "/app/"]
WORKDIR /app
RUN npm ci
RUN npm install -g @angular/cli

# Copy the source files into the container
COPY . .

# Build the Angular application
RUN ng build --configuration=production

# Nginx stage for serving the built application
FROM nginx:alpine
COPY --from=build /app/dist/varico/browser/ /usr/share/nginx/html
