# Use the official Node.js image as a base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

COPY . .

# Install Node.js dependencies
RUN npm install
RUN npm run build

# Expose the port defined by the PORT environment variable
EXPOSE ${PORT}

# Start the Express server
CMD ["npm", "start"]
