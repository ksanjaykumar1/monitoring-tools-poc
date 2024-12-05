# Use the official Node.js image from Docker Hub
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install the dependencies defined in package.json
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the app
CMD ["node", "server"]
