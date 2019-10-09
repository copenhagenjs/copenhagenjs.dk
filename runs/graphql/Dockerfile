FROM node:12-alpine

WORKDIR /app

ADD runs/graphql/package.json runs/graphql/package-lock.json /app/

RUN npm i

ADD runs/graphql /app

ADD _posts /app/_posts

ADD data /app/data

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ENTRYPOINT exec /bin/berglas exec -- npm start
