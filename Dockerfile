FROM node:22.12

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY . .
RUN yarn install

# Build app
RUN npx prisma generate --allow-no-models
RUN yarn build

CMD ["sh", "-c", "yarn start:prod-${MODE}" ]
