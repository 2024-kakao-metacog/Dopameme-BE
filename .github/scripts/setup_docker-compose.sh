#!/bin/bash


COMPOSE_VERSION="2.32.4"

echo "Downloading Docker Compose version $COMPOSE_VERSION..."
sudo curl -L "https://github.com/docker/compose/releases/download/v${COMPOSE_VERSION}/docker-compose-$(uname -s | tr '[:upper:]' '[:lower:]')-$(uname -m)" -o /usr/local/bin/docker-compose

echo "Making Docker Compose executable..."
sudo chmod +x /usr/local/bin/docker-compose

export PATH="/usr/local/bin:$PATH"

echo "Verifying Docker Compose installation..."
docker-compose --version

echo "Docker Compose installation completed."
