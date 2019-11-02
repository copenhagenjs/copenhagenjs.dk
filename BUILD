genrule(
  name = "next",
  srcs = glob([
    "_speakers/**",
    ".storybook/**",
    "components/**",
    "data/**",
    "Dockerfile",
    "firebase.json",
    "next.config.js",
    "package-lock.json",
    "package.json",
    "pages/**",
    "static/**",
    "stories/**",
    "utils/**",
  ]) + ["//_posts:copy"],
  cmd = "tar --exclude='./node_modules' -czh . | docker build -t cphjs - && docker run --rm cphjs sh -c 'tar -C out -cvzf - .' > $(location build.tar.gz)",
  outs = ["build.tar.gz"],
  tags = ["no-sandbox"]
)

genrule(
  name = "deploy",
  srcs = ["build.tar.gz", "firebase.json"],
  cmd = "mkdir -p out && tar -xf $(location build.tar.gz) -C out && firebase deploy | tee $(location firebase_deploy.txt)",
  outs = ["firebase_deploy.txt"],
  tags = ["manual", "local"]
)
