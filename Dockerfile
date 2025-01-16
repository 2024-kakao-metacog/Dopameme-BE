FROM node:22.12 AS builder

WORKDIR /app

# Install app dependencies
COPY . .
RUN yarn install

RUN yarn build

# Production image
FROM node:22.12
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/prisma/schema.prisma ./prisma/schema.prisma
RUN yarn install --production
RUN npx prisma generate --allow-no-models

CMD ["sh", "-c", "yarn start:prod-${MODE}" ]
