import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [VideoController],
  providers: [VideoService, DatabaseService, UserService],
})
export class VideoModule {}
