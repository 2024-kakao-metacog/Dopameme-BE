import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenPayload } from '../entities/refresh-token-payload.entity';
import { JwtConfig } from '../../config/jwt.config';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
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
    const user = await this.userService.findUserByUserId(payload.userId);

    if (user === null) {
      return null;
    }

    const res: Response = req.res;

    const { accessToken, refreshToken } =
      await this.authService.createAuthTokens(user);

    res.setHeader('Authorization', `Bearer ${accessToken}`);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // TODO: payload 넘기는 것으로 수정 필요(security)
    return user;
  }
}
