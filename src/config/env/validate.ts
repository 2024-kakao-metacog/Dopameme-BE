import { plainToClass } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';

enum Environment {
  development = 'development',
  stage = 'stage',
  production = 'production',
}

class EnvironmentVariables {
  // App Config
  @IsEnum(Environment)
  APP_MODE: Environment;

  @IsString()
  APP_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  APP_PORT: number;

  @IsString()
  APP_ENTRYPOINT: string;

  // Database Config
  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;

  // CORS Config
  @IsString()
  CORS_ORIGIN: string;

  @IsString()
  CORS_METHODS: string;

  @IsString()
  CORS_ALLOWED_HEADERS: string;

  @IsString()
  CORS_CREDENTIALS: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
