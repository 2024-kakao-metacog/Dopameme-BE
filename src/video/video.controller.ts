import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindVideoMetadataListDto } from './dto/find-video-metadata-list.dto';
import { VideoMetadataListResponseDto } from './dto/video-metadata-list-response.dto';
import { valid } from '../library/class-validate';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/metadata/list')
  @ApiOperation({ summary: 'Retrieve Video Metadata' })
  @ApiQuery({
    name: 'maxResults',
    required: false,
    description: 'The maximum number of results to retrieve, default is 4',
    example: 4,
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully returned video metadata',
    type: VideoMetadataListResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request format.',
  })
  async getVideoMetadatas(
    @Query('maxResults')
    maxResults: number = 4,
  ) {
    await valid(FindVideoMetadataListDto, { maxResults });
    return this.videoService.getVideoMetadatasDummy(maxResults);
  }
}
