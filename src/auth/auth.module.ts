import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, UserService, DatabaseService],
})
export class AuthModule {}
