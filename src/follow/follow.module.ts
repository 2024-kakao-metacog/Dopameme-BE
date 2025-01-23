import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { DatabaseService } from '../database.service';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [AuthModule],
  controllers: [FollowController],
  providers: [FollowService, DatabaseService, UserService],
})
export class FollowModule {}
