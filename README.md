# 📦 CopenhagenJS Website

Made with [Next.js](https://nextjs.org/) and deployed to [Firebase](https://firebase.google.com/).

How to run the website:

```bash
$ npm install
```

```bash
$ npm run dev
```

And the CopenhagenJS Website should become available on `http://localhost:3000`

## How to run services

First install [bazel](https://bazel.build/)

Then build each service separately

```bash
$ bazel build //runs/graphql:docker
$ bazel build //runs/feed:docker
$ bazel build //runs/auth:auth
```

or build them all

```bash
$ bazel build //runs/...
```
