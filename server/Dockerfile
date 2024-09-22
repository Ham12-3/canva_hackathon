# Base image with Node.js 18
FROM node:18-slim 

# Set the working directory to the server directory inside the container
WORKDIR /server

# Copy the package.json and package-lock.json from the server directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server directory code
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port (replace with your actual app port if it's not 8000)
EXPOSE 8000

# Start the app using the production build
CMD ["npm", "run", "start"]
