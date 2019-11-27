genrule(
  name = "docker",
  srcs = glob(["**"]),
  cmd = "tar -C runs/auth -czh . | docker build -q -t auth - > $@",
  outs = ["build.txt"],
  tags = ["requires-network", "no-remote"]
)

genrule(
  name = "run",
  srcs = ["build.txt", "BUILD", "run.sh"],
  cmd = "echo IMAGESHA=$$(cat $(location build.txt)) > $@ && cat $(location run.sh) >> $@",
  outs = ["run_auth.sh"],
  executable = True
)
