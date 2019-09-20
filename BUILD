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
  cmd = "tar -czh . | docker build -t cphjs - && echo docker run --rm -v $$PWD/$(location build.tar.gz):/app/mountedout cphjs sh -c 'tar -C out -cvzf /app/mountedout/build.tar.gz . && sleep 10 && ls -alF /app/mountedout' && echo kevin && ls -alF $$PWD/$$(dirname $(location build.tar.gz)) && echo simper ls -alF $(location build.tar.gz) && echo nyberg",
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
