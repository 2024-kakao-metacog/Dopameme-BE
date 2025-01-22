import { registerAs } from '@nestjs/config';

export interface CorsConfig {
  origin: Array<string>;
  methods: Array<string>;
  allowedHeaders: Array<string>;
  exposedHeaders: Array<string>;
  credentials: boolean;
} // https://github.com/expressjs/cors#configuration-options

const corsConfig = registerAs<CorsConfig>('cors', () => ({
  origin: process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
  methods: process.env.CORS_METHODS.split(',').map((method) => method.trim()),
  allowedHeaders: process.env.CORS_ALLOWED_HEADERS.split(',').map(
    (allowedHeader) => allowedHeader.trim(),
  ),
  exposedHeaders: process.env.CORS_EXPOSED_HEADERS.split(',').map(
    (exposedHeader) => exposedHeader.trim(),
  ),
  credentials: process.env.CORS_CREDENTIALS.toLowerCase() === 'true',
}));

export default corsConfig;
