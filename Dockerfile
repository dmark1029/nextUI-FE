# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files to install dependencies first
COPY package*.json ./

# Install project dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code into the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
