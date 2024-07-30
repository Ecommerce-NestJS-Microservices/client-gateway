FROM node:20.15.0-alpine3.19

WORKDIR /usr/src/app

#COPY package*.song ./
COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000