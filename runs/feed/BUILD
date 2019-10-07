genrule(
  name = "docker",
  srcs = glob(["**"]) + ["//_posts:copy"],
  cmd = "tar -czh . | docker build -t feed -f runs/feed/Dockerfile - > $@",
  outs = ["build.txt"],
  tags = ["local"]
)

sh_binary(
    name = "execute",
    srcs = ["run.sh"],
    data = [":docker"]
)

genrule(
  name = "deploy",
  srcs = ["build.txt"],
  cmd = "echo example && echo deploy > $@",
  outs = ["deploy.txt"],
  tags = ["manual", "local"]
)
