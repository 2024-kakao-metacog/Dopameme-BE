#!/bin/bash

# Start SSH agent
eval $(ssh-agent -s)
echo $(whoami)

echo "make ~/.ssh"
mkdir -p ~/.ssh

echo "Add SSH key..."
echo "$SSH_PRIVATE_KEY_BASE64" | base64 --decode > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa

echo "Add SSH key to agent..."
ssh-add ~/.ssh/id_rsa
ssh-keyscan -p ${SSH_PORT} ${SSH_HOST} >> ~/.ssh/known_hosts
chmod 600 ~/.ssh/known_hosts
