#!/bin/bash

echo "Setting up environment variables from GitHub Secrets..."

echo "MODE=$DOCKER_APP_MODE" >> .env
echo "EXTERNAL_PORT_HTTP=$DOCKER_EXTERNAL_PORT_HTTP" >> .env
echo "INTERNAL_PORT_HTTP=$DOCKER_INTERNAL_PORT_HTTP" >> .env

echo "Environment variables set successfully."
