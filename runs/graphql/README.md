# GraphQL API for CopenhagenJS events and updates

This is so we can easily pull data into the website

## How to build

```
$ bazel run //runs/graphql:run
```

## How to push to GCR

```
$ bazel build //runs/graphql:push --action_env=SHA=$(git rev-parse --short=8 --verify HEAD) --sandbox_debug
```
