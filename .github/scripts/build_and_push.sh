#!/bin/bash

echo "Building Docker image using docker-compose..."
# docker-compose build
docker-compose build --no-cache

echo "Pushing Docker image to Docker Hub..."
docker-compose push

echo "Docker image build and push completed."
