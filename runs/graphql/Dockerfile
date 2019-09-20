FROM node:12-alpine

WORKDIR /app

ADD runs/graphql /app

ADD _posts /app/_posts

ADD data /app/data

RUN npm i

CMD npm start
