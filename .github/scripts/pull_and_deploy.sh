#!/bin/bash

echo "Pulling latest Docker image from Docker Hub..."
docker pull $DOCKER_IMAGE_NAME

echo "Stopping and removing old containers..."
docker stop dopameme-be || true
docker rm dopameme-be || true

echo "Starting new container..."
docker run -d \
  --name dopameme-be \
  --env MODE=${DOCKER_APP_MODE} \
  -p ${EXTERNAL_PORT_HTTP}:${INTERNAL_PORT_HTTP} \
  -v ${REMOTE_WORKDIR}/videofile:/app/videofile \
  -v ${REMOTE_WORKDIR}/dummydata:/app/dummydata \
  -v ${REMOTE_WORKDIR}/env:/app/env \
  $DOCKER_IMAGE_NAME

echo "Deployment completed successfully."
