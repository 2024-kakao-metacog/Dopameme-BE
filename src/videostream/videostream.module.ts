import { Module } from '@nestjs/common';
import { VideostreamService } from './videostream.service';
import { VideostreamController } from './videostream.controller';

@Module({
  imports: [],
  controllers: [VideostreamController],
  providers: [VideostreamService],
})
export class VideoStreamModule {}
