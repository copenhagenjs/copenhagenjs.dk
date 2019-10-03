genrule(
  name = "docker",
  srcs = glob([
    "Dockerfile",
    "package-lock.json",
    "package.json",
    "server.js",
    "src/**",
  ]) + ["//_posts:copy", "//data:copy"],
  cmd = "tar -czh . | docker build -q -t copenhagen.js-graphql -f runs/graphql/Dockerfile - > $@",
  outs = ["build.txt"]
)

genrule(
  name = "run",
  srcs = ["build.txt"],
  cmd = "echo docker run -it --rm -p 9000:9000 $$(cat $(location build.txt)) > $@",
  outs = ["run_graphql.sh"],
  executable = True
)
