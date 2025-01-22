import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindVideoMetadataDto,
  FindVideoMetadataListDto,
} from './dto/find-video-metadata.dto';
import {
  VideoMetadataListResponseDto,
  VideoMetadataResponseDto,
} from './dto/video-metadata-response.dto';
import { valid } from '../library/class-validate';
import { UserService } from '../user/user.service';
import { FindUserDto } from '../user/dto/find-user.dto';

@ApiTags('Video')
@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly userService: UserService,
  ) {}

  @Get('/metadatas')
  @ApiOperation({ summary: 'Retrieve User Video Metadata List' })
  @ApiQuery({
    name: 'userId',
    required: true,
    description: 'The unique identifier of the user',
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
  async getVideoMetadataList(
    @Query('userId')
    userId: string,
  ): Promise<VideoMetadataListResponseDto> {
    await valid(FindUserDto, { userId });
    const user = await this.userService.findUserByUserId(userId);

    if (user === null) {
      throw new NotFoundException('User not found');
    }

    const metadataList = await this.videoService.findVideoByUserId(user.id);

    // To Do: Implement auth user check

    const snippet = metadataList.map((metadata) => {
      return {
        title: metadata.title,
        videoUrl: metadata.videoUrl,
        thumbnailUrl: metadata.thumbnailUrl,
        publishedAt: metadata.publishedAt,
        userId: user.userId,
        userNickname: user.nickname,
        isOwner: false,
        isSubscribed: false,
        canSubscribe: false,
      };
    });

    return {
      snippet: snippet,
    };
  }

  @Get('/metadatas/random')
  @ApiOperation({ summary: 'Retrieve Random Video Metadata List' })
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
  async getVideoMetadataListRandom(
    @Query('maxResults')
    maxResults: number = 4,
  ): Promise<VideoMetadataListResponseDto> {
    await valid(FindVideoMetadataListDto, { maxResults });

    const metadataList =
      await this.videoService.getVideoMetadataListRandom(maxResults);

    // To Do: Implement auth user check

    const snippet = await Promise.all(
      metadataList.map(async (metadata) => {
        const user = await this.userService.findUserById(metadata.userId);

        return {
          title: metadata.title,
          videoUrl: metadata.videoUrl,
          thumbnailUrl: metadata.thumbnailUrl,
          publishedAt: metadata.publishedAt,
          userId: user.userId,
          userNickname: user.nickname,
          isOwner: false,
          isSubscribed: false,
          canSubscribe: false,
        };
      }),
    );

    return {
      snippet: snippet,
    };
  }

  @Get('/metadata')
  @ApiOperation({ summary: 'Retrieve Video Metadata' })
  @ApiQuery({
    name: 'videoUrl',
    required: true,
    description: 'The unique identifier of the video',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully returned video metadata',
    type: VideoMetadataResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request format.',
  })
  async getVideoMetadata(
    @Query('videoUrl')
    videoUrl: string,
  ): Promise<VideoMetadataResponseDto> {
    await valid(FindVideoMetadataDto, { videoUrl });
    const metadata = await this.videoService.findVideoByVideoUrl(videoUrl);

    if (metadata === null) {
      throw new NotFoundException('Video not found');
    }

    const user = await this.userService.findUserById(metadata.userId);

    // To Do: Implement auth user check

    return {
      snippet: {
        title: metadata.title,
        videoUrl: metadata.videoUrl,
        thumbnailUrl: metadata.thumbnailUrl,
        publishedAt: metadata.publishedAt,
        userId: user.userId,
        userNickname: user.nickname,
        isOwner: false,
        isSubscribed: false,
        canSubscribe: false,
      },
    };
  }
}
