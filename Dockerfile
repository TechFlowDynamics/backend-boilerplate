# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compile TypeScript files to JavaScript
RUN npm run build

# Start a new, clean stage from the official Node.js runtime
FROM node:18-alpine

# Set the working directory in the new stage
WORKDIR /app

# Copy only the necessary files from the previous build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the application port (adjust if necessary)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/index.js"]
