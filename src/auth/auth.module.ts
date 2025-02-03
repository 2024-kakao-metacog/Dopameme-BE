import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';
import { AccessTokenGuard } from './guard/access-token.guard';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';
import { RefreshTokenGuard } from './guard/refresh-token.guard';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    DatabaseService,
    JwtAuthStrategy,
    AccessTokenGuard,
    JwtRefreshStrategy,
    RefreshTokenGuard,
  ],
  exports: [AccessTokenGuard, RefreshTokenGuard],
})
export class AuthModule {}
