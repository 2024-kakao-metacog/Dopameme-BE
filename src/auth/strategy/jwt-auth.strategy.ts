import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../entities/access-token-payload.entity';
import { JwtConfig } from '../../config/jwt.config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  'access_token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.publicKey,
      algorithms: ['RS256'],
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: string, payload: AccessTokenPayload) {
    const user = await this.userService.findUserByUserId(payload.userId);

    if (user === null) {
      return null;
    }

    return user;
  }
}
