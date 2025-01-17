#!/bin/bash

echo "Building Docker image using docker-compose..."
docker-compose build

echo "Pushing Docker image to Docker Hub..."
docker-compose push

echo "Docker image build and push completed."
