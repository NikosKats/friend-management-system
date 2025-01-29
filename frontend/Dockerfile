# Use Node.js as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose port
EXPOSE 5173

# Start Vite in development mode
CMD ["npm", "run", "dev"]
