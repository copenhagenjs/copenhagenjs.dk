FROM node:12-alpine

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm ci

ADD . /app

RUN npm run build
