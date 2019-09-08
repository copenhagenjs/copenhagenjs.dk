FROM node:12-alpine

WORKDIR /app

EXPOSE 9000

ADD runs/feed /app

ADD _posts /app/_posts

RUN npm i

CMD npm start
