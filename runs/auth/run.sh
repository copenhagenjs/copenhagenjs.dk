docker rm -f auth
docker run --init --name=auth --rm -p 9000:9000 -v $HOME/.config/gcloud/application_default_credentials.json:/secrets/cred.json -e GOOGLE_APPLICATION_CREDENTIALS=/secrets/cred.json $IMAGESHA
