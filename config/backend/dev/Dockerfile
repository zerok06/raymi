# Use an official Node.js runtime as a base image
FROM node:22-alpine AS base

# Set the working directory inside the container
WORKDIR /api

# Copy package.json and yarn.lock into the container
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the project
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run" ,"dev"]