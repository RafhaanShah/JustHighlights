# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Build your React app (you may need to adjust the build command if needed)
RUN npm run build

# Expose the port that your React app will run on (default is 3000)
EXPOSE 3000

# Define the command to start your React app
CMD [ "npm", "start" ]
