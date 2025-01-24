import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh_token') {
  handleRequest<TUser = any>(err: any, user: TUser, info: any): TUser {
    // TokenExpiredError 발생 시 처리
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException(
        'Your refresh token has expired, please login',
      );
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }

    return user;
  }
}
