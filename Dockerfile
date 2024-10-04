# Step 1: Use an official Node.js runtime as the base image
FROM node:20

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port that your application will run on
EXPOSE 5000

# Step 7: Command to start the Node.js application
CMD ["npm", "start"]
