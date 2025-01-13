import { registerAs } from '@nestjs/config';

export interface AppConfig {
  mode: string;
  host: string;
  port: number;
  entrypoint: string;
}

const appConfig = registerAs<AppConfig>('app', () => ({
  mode: process.env.APP_MODE,
  host: process.env.APP_HOST,
  port: parseInt(process.env.APP_PORT, 10),
  entrypoint: process.env.APP_ENTRYPOINT,
}));

export default appConfig;
