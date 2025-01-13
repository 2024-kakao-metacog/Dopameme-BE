import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';
import { DatabaseConfig } from './config/database.config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const appConfig = configService.get<AppConfig>('app');
  const databaseConfig = configService.get<DatabaseConfig>('database');
  const corsConfig = configService.get('cors');

  app.setGlobalPrefix(appConfig.entrypoint);

  app.enableCors({
    origin: corsConfig.origin,
    methods: corsConfig.methods,
    allowedHeaders: corsConfig.allowedHeaders,
    credentials: corsConfig.credentials,
  });

  console.log('App Config: ', appConfig);
  console.log('Database Config: ', databaseConfig);
  console.log('CORS Config: ', corsConfig);

  const config = new DocumentBuilder()
    .setTitle('Dopameme API Docs')
    .setDescription('Dopameme API description')
    .setVersion('1.0.0')
    .addTag('shortform')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(appConfig.port, appConfig.host, () => {
    console.log(
      `✅ Server is running at ${appConfig.host}:${appConfig.port}/${appConfig.entrypoint}`,
    );
  });
}
bootstrap();
