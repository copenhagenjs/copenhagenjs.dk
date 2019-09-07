genrule(
  name = "feed",
  srcs = glob(["**"]) + ["//_posts:copy"],
  cmd = "tar -czh . | docker build -t feed -f runs/feed/Dockerfile - > $@",
  outs = ["build.txt"]
)
