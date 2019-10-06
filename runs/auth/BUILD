genrule(
  name = "docker",
  srcs = glob(["**"]),
  cmd = "tar -C runs/auth -czh . | docker build -q -t auth - > $@",
  outs = ["build.txt"]
)

genrule(
  name = "run",
  srcs = ["build.txt"],
  cmd = "echo docker run -it --rm -p 9000:9000 -v /Users/kevinsimper/.config/gcloud/application_default_credentials.json:/secrets/cred.json -e GOOGLE_APPLICATION_CREDENTIALS=/secrets/cred.json $$(cat $(location build.txt)) > $@",
  outs = ["run_graphql.sh"],
  executable = True
)
