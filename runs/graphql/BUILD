genrule(
  name = "docker",
  srcs = glob([
    "BUILD",
    "Dockerfile",
    "package-lock.json",
    "package.json",
    "server.js",
    "src/**",
  ]) + ["//_posts:copy", "//data:copy"],
  cmd = "tar -czh . | docker build -t copenhagen.js-graphql -f runs/graphql/Dockerfile - > $@",
  outs = ["build.txt"]
)
