<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://github.com/user-attachments/assets/e2fbbfe8-7cd9-4f3f-8ab4-bb5d7e4047ff" width="240" alt="Dopameme Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 설명

도파밈 프로젝트의 WAS입니다

[Nest](https://github.com/nestjs/nest) 프레임워크에 Prisma(ORM)가 적용되어있습니다.

데이터베이스가 연결되어야 프로젝트가 동작합니다.

## 프로젝트 셋업

`src/config/env` 에서 development, stage, production 모드 환경에 맞는 env를 작성하세요.

`prisma/schema copy.prisma` 로 `prisma/schema.prisma` 를 작성하세요

## 프로젝트 빌드

```bash
$ yarn install

# 프리즈마 스키마 생성
$ npx prisma generate
```

## 프로젝트 시작

-dev, -stage, -prod는 모드 환경에 따른 환경 변수입니다.

```bash
# debug
$ yarn start:debug-dev
$ yarn start:debug-stage
$ yarn start:debug-prod

# watch mode
$ yarn start:watch-dev
$ yarn start:watch-stage
$ yarn start:watch-prod

# production
$ yarn start:prod-dev
$ yarn start:prod-stage
$ yarn start:prod-prod
```

## 테스트

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## 도커 컴포즈

```bash
# image build
$ docker-compose build

# container start
$ docker-compose up -d

# container stop
$ docker-compose down
$ docker-compose down --rmi all
```

## 라이센스

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
