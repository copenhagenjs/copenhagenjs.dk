genrule(
  name = "docker",
  srcs = glob([
    "Dockerfile",
    "babel.config.js",
    "tsconfig.json",
    "package-lock.json",
    "package.json",
    "server.js",
    "src/**",
  ]) + ["//_posts:copy", "//data:copy"],
  cmd = "tar -czh . | docker build -q -t copenhagen.js-graphql -f runs/graphql/Dockerfile - > $@",
  outs = ["build.txt"],
  tags = ["requires-network", "no-remote"]
)

genrule(
  name = "run",
  srcs = ["build.txt"],
  cmd = "echo docker run -it --rm -p 9000:9000 $$(cat $(location build.txt)) > $@",
  outs = ["run_graphql.sh"],
  executable = True
)

sh_test(
  name = "test",
  srcs = ["test.sh"],
  data = [":docker"],
)

genrule(
  name = "tag",
  srcs = ["build.txt"],
  cmd = "docker tag $$(cat $(location build.txt)) gcr.io/copenhagenjsdk/copenhagenjs.dk-graphql:$$SHA > $@",
  outs = ["tag.txt"],
  tags = ["manual"]
)

genrule(
  name = "push",
  srcs = ["tag.txt"],
  cmd = "docker push gcr.io/copenhagenjsdk/copenhagenjs.dk-graphql:$$SHA > $@",
  outs = ["push_sha.txt"],
  tags = ["manual"]
)
