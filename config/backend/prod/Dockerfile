# Use an official Node.js runtime as a base image
FROM node:22-alpine AS base

# Set the working directory inside the container
WORKDIR /secure-password

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the entire project into the container
COPY . .

# Build the project
RUN yarn build

# Expose the application port
EXPOSE 5656

# Start the application
CMD ["yarn", "start"]