import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from '../entities/refresh-token-payload.entity';
import { AuthService } from '../auth.service';
import { JwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.refresh_token;
        },
      ]),
      secretOrKey: jwtConfig.publicKey,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    console.log('Refresh Token Strategy:', payload);

    const refreshToken = req?.cookies?.refresh_token;

    if (!refreshToken) {
      throw new UnauthorizedException('refresh token is undefined');
    }

    // const result = await this.authService.compareUserRefreshToken(
    //   payload.userId,
    //   refreshToken,
    // );
    // if (!result) {
    //   throw new UnauthorizedException('refresh token is wrong');
    // }

    req.user = payload;

    return payload;
  }
}
