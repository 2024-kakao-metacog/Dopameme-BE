import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

class EnvironmentVariables {
  // App Config
  @IsString()
  APP_MODE: string;

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
  CORS_EXPOSED_HEADERS: string;

  @IsString()
  CORS_CREDENTIALS: string;

  // JWT Config
  @IsString()
  JWT_PRIVATE_KEY: string;

  @IsString()
  JWT_PUBLIC_KEY: string;

  @IsString()
  JWT_ALGORITHM: string;

  @IsString()
  JWT_ACCESS_TOKEN_EXP: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXP: string;
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
