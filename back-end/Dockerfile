FROM node:latest

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package.json ./

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 3000

CMD ["node","server.js"]