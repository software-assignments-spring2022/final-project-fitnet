FROM node:latest

# Working directory be app
WORKDIR /app

COPY package.json ./

# Install dependencies
RUN npm install

# copy local files to app folder
COPY . .

EXPOSE 4000

CMD ["npm","start"]