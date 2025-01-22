import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('access_token') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    // TokenExpiredError 발생 시 처리
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('Your access token has expired');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }

    return user.id;
  }
}
