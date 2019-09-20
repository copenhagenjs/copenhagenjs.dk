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
  cmd = "tar -czh . | docker build -t cphjs - && docker run --rm -v /github/workspace/bazel-out/k8-fastbuild/bin:/app/mountedout cphjs sh -c 'tar -C out -cvzf /app/mountedout/build.tar.gz . && sleep 10 && ls -alF /app/mountedout' && echo kevin && echo ls -alF $$PWD/$$(dirname $(location build.tar.gz)) && ls -alF $$PWD/$$(dirname $(location build.tar.gz)) && echo simper && ls -alF bazel-out/k8-fastbuild/bin && echo nyberg",
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
