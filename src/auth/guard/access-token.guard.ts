import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('access_token') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const req = context.switchToHttp().getRequest();

    // TokenExpiredError 발생 시 처리
    if (info?.name === 'TokenExpiredError') {
      req.isAccessTokenExpired = true;
      return user;
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }

    return user;
  }
}
