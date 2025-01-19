import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  privateKey: string;
  publicKey: string;
  algorithm: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

const jwtConfig = registerAs<JwtConfig>('jwt', () => ({
  privateKey: process.env.JWT_PRIVATE_KEY,
  publicKey: process.env.JWT_PUBLIC_KEY,
  algorithm: process.env.JWT_ALGORITHM,
  accessExpiresIn: process.env.JWT_ACCESS_TOKEN_EXP || '1h',
  refreshExpiresIn: process.env.JWT_REFRESH_TOKEN_EXP || '1w',
}));

export default jwtConfig;
