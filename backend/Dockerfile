# Dockerfile for Express Backend

# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose your backend port
EXPOSE 6300

# Start the backend server
CMD ["node", "server.js"]
