genrule(
  name = "docker",
  srcs = glob(["**"]) + ["//_posts:copy"],
  cmd = "tar -czh . | docker build -q -t feed -f runs/feed/Dockerfile - > $@",
  outs = ["build.txt"],
  tags = ["local"]
)

genrule(
  name = "tag",
  srcs = ["build.txt"],
  cmd = "docker tag $$(cat $(location build.txt)) gcr.io/copenhagenjsdk/copenhagenjs.dk-feed:$$SHA > $@",
  outs = ["tag.txt"],
  tags = ["manual"]
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
