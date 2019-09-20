# 📦 CopenhagenJS Website

Made with Next.js and deployed to Firebase.

How to run the website:

```
npm install
```

```
npm run dev
```

## How to run services

First install bazel

Then to build each service

```
$ bazel build //runs/graphql:docker
$ bazel build //runs/feed:docker
$ bazel build //runs/auth:auth
```

or build them all

```
$ bazel build //runs/...
```
