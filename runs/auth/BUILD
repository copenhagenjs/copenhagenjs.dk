genrule(
  name = "docker",
  srcs = glob(["**"]),
  cmd = "tar -C runs/auth -czh . | docker build -q -t auth - > $@",
  outs = ["build.txt"]
  tags = ["local"]
)

genrule(
  name = "run",
  srcs = ["build.txt", "BUILD"],
  cmd = "echo IMAGESHA=$$(cat $(location build.txt)) > $@ && echo 'docker run -it --rm -p 9000:9000 -v $$HOME/.config/gcloud/application_default_credentials.json:/secrets/cred.json -e GOOGLE_APPLICATION_CREDENTIALS=/secrets/cred.json $$IMAGESHA' >> $@",
  outs = ["run_graphql.sh"],
  executable = True
)
