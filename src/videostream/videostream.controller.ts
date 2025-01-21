import {
  BadRequestException,
  Controller,
  Get,
  Param,
  StreamableFile,
} from '@nestjs/common';
import { VideostreamService } from './videostream.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { join } from 'path';
import { valid } from '../library/class-validate';
import { VideoChunkDto, VideonameDto } from './dto/request-video.dto';

@Controller('videostream')
export class VideostreamController {
  constructor(private readonly videostreamService: VideostreamService) {}

  // To Do: Upload video file
  //
  // @Get('encode')
  // async encode(
  //   @Query('filename')
  //   filename: string,
  // ) {
  //   await this.videostreamService.encodeVideoStream(filename);
  // }

  @Get(':videoname/:chunk')
  @ApiOperation({ summary: 'Request Video Chunk' })
  @ApiParam({
    name: 'videoname',
    description: 'Name of the video to request',
    required: true,
  })
  @ApiParam({
    name: 'chunk',
    description: 'Name of the video chunk to request',
    required: true,
  })
  async requestVideostream(
    @Param('videoname') videoname: string,
    @Param('chunk') chunk: string,
  ) {
    await valid(VideonameDto, { videoname });
    await valid(VideoChunkDto, { chunk });

    const filepath = join(videoname, chunk);

    if (!this.videostreamService.isExistVideoChunk(filepath)) {
      throw new BadRequestException('Video not found');
    }
    if (chunk.match('manifest.mpd')) {
      const stream = await this.videostreamService.getVideoStream(filepath);
      return new StreamableFile(stream, {
        type: 'application/dash+xml',
        disposition: `inline; filename="Manifest.mpd"`,
      });
    } else {
      const stat = await this.videostreamService.getVideoStat(filepath);
      const stream = this.videostreamService.getVideoStream(filepath);
      return new StreamableFile(stream, {
        length: stat.size,
      });
    }
  }
}
