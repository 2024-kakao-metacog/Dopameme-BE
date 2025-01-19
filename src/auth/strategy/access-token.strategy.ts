import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../entities/access-token-payload.entity';
import { JwtConfig } from '../../config/jwt.config';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access_token',
) {
  constructor(private readonly configService: ConfigService) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          console.log(request.cookies);
          return request?.cookies?.access_token;
        },
      ]),
      secretOrKey: jwtConfig.publicKey,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: AccessTokenPayload) {
    console.log('Access Token Strategy:', payload);
    req.user = payload;
    return payload;
  }
}
