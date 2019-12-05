FROM node:12-alpine

WORKDIR /app

COPY --from=gcr.io/berglas/berglas:latest /bin/berglas /bin/berglas

ADD runs/graphql/package.json runs/graphql/package-lock.json /app/

RUN npm i

ADD _posts /app/_posts

ADD data /app/data

ADD runs/graphql /app

RUN npm run build && mv dist/src/* dist/

ENTRYPOINT exec /bin/berglas exec -- npm start
