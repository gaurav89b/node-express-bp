#FROM node:10
FROM node:10-slim

# Create app directory
WORKDIR /usr/src/app
ENV app_jwtPrivateKey=somesecret
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Uncomment below line if not using with Docker-compose
#EXPOSE 3000
#CMD [ "npm", "start" ]
