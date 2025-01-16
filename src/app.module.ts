import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import corsConfig from './config/cors.config';
import { validate } from './config/validate';
import { resolve } from 'path';
import { DatabaseService } from './database.service';
import { VideoModule } from './video/video.module';
import { VideoStreamModule } from './videostream/videostream.module';

// __dirname is src/
const envFilePath = resolve(
  __dirname,
  '..',
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
    VideoModule,
    VideoStreamModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
