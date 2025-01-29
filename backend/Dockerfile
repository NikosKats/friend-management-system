# Use Node.js as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

# Expose port
EXPOSE 8080

# Start backend with nodemon for live reload
CMD ["npm", "run", "dev"]
