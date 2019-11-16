FROM node:12-alpine

WORKDIR /app

ADD web/package.json web/package-lock.json /app/

RUN npm ci

ADD web /app

ADD _posts /app/_posts

ADD data /app/data

RUN npm run build
