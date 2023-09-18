# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port that your application will listen on
EXPOSE 5000

# Define how to start your application
CMD [ "ts-node", "src/index.ts" ]