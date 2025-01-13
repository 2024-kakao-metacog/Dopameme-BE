import { Controller, Get, Query } from '@nestjs/common';
import { VideoMetadata, VideoService } from './video.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/metadatas')
  @ApiOperation({ summary: '동영상 메타데이터 조회' })
  @ApiQuery({
    name: 'maxResults',
    required: false,
    description: '가져올 최대 결과 수',
    example: 5,
  })
  @ApiResponse({ status: 200, description: '성공적으로 메타데이터를 반환함.' })
  @ApiResponse({ status: 400, description: '잘못된 요청 형식.' })
  getVideoMetadatas(
    @Query('maxResults') maxResults: number = 5,
  ): VideoMetadata[] {
    return this.videoService.getVideoMetadatasDummy(maxResults);
  }
}
