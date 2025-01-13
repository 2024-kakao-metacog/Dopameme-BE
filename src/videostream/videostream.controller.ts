import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { VideostreamService } from './videostream.service';

@Controller('videostream')
export class VideostreamController {
  constructor(private readonly videostreamService: VideostreamService) {}

  @Get('encode')
  async encode(
    @Query('filename')
    filename: string,
  ) {
    await this.videostreamService.encodeVideoStream(filename);
  }

  @Get('/video')
  async requestManifest(@Query('manifest') manifest?: string) {
    if (manifest === undefined) {
      throw new BadRequestException('Manifest is required');
    }

    const manifestFile = `${manifest}`;
    const stream = await this.videostreamService.getVideoStream(manifestFile);
    return new StreamableFile(stream, {
      type: 'application/dash+xml',
      disposition: `inline; filename="Manifest.mpd"`,
    });
  }

  @Get(':chunk')
  async requestChunk(@Param('chunk') chunk: string) {
    if (chunk === undefined) {
      throw new BadRequestException('Chunk is required');
    }

    const stat = await this.videostreamService.getVideoStat(chunk);

    if (chunk.match('init-stream')) {
      const stream = this.videostreamService.getVideoStream(chunk);
      return new StreamableFile(stream, {
        length: stat.size,
      });
    }
    if (chunk.match('chunk-stream')) {
      const stream = this.videostreamService.getVideoStream(chunk);
      return new StreamableFile(stream, {
        length: stat.size,
      });
    }
  }
}
