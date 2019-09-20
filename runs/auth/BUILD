genrule(
  name = "docker",
  srcs = glob(["**"]),
  cmd = "tar -C runs/auth -czh . | docker build -t auth - > $@",
  outs = ["build.txt"]
)

genrule(
  name = "deploy",
  srcs = ["build.txt"],
  cmd = "echo example && echo deploy > $@",
  outs = ["deploy.txt"],
  tags = ["manual", "local"]
)
