import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh_token') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.isAccessTokenExpired) {
      return super.canActivate(context);
    }

    return true;
  }

  handleRequest<TUser extends User>(err: any, user: TUser, info: any): TUser {
    if (info?.name === 'TokenExpiredError') {
      throw new UnauthorizedException('please login again');
    }

    if (err || !user) {
      throw err || new UnauthorizedException('Unauthorized access');
    }

    return user;
  }
}
