import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { DatabaseService } from '../database.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FollowController],
  providers: [FollowService, DatabaseService],
})
export class FollowModule {}
