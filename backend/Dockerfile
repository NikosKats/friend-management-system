# Use Node.js as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install nodemon globally for live reload during development
RUN npm install -g nodemon

# Install TypeScript globally to ensure tsc is available
RUN npm install -g typescript

# Expose the port the app will run on
EXPOSE 8080

# Start both tsc watch and nodemon to run the backend with live reloading
CMD ["npm", "run", "dev"]
