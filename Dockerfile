FROM node:12-alpine

WORKDIR /app

ADD package.json package-lock.json /app/

RUN npm ci

ADD . /app

RUN npm run build-storybook

RUN sed -i 's/<script src="/<script src="\/static\/storybook\//g' static/storybook/iframe.html

RUN npm run build
