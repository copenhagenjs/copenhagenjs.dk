genrule(
  name = "next",
  srcs = glob([
    "_speakers/**",
    "components/**",
    "data/**",
    "Dockerfile",
    "firebase.json",
    "next.config.js",
    "package-lock.json",
    "package.json",
    "pages/**",
    "README.md",
    "static/**",
    "stories/**",
    "utils/**",
    "WORKSPACE"
  ]) + ["//_posts:copy"],
  cmd = "tar -czh . | docker build -t cphjs - && docker run --rm -v $$PWD/$$(dirname $(location build.tar.gz)):/app/mountedout cphjs sh -c 'tar -C out -cvzf /app/mountedout/build.tar.gz . && sleep 10 && ls -alF /app/mountedout'",
  outs = ["build.tar.gz"],
  tags = ["local"]
)

genrule(
  name = "deploy",
  srcs = ["build.tar.gz", "firebase.json"],
  cmd = "mkdir out && tar -xf $(location build.tar.gz) -C out && firebase deploy > $(location firebase_deploy.txt)",
  outs = ["firebase_deploy.txt"],
  tags = ["manual", "local"]
)
