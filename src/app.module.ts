import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import corsConfig from './config/cors.config';
import { validate } from './config/env/validate';
import { resolve } from 'path';
import { DatabaseService } from './database.service';

// __dirname is src/
const envFilePath = resolve(
  __dirname,
  'config',
  'env',
  `.env.${process.env.APP_MODE}.local`,
);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
      load: [appConfig, databaseConfig, corsConfig],
      validate: validate,
    }), // https://docs.nestjs.com/techniques/configuration
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
