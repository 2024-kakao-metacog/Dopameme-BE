import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthStrategy } from './strategy/jwt-auth.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    DatabaseService,
    JwtAuthStrategy,
    JwtAuthGuard,
    JwtRefreshStrategy,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
