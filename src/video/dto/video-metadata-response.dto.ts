import { ApiProperty } from '@nestjs/swagger';

class VideoMetadataSnippet {
  @ApiProperty({
    description: 'The title of the video',
    example: 'Sample Video Title',
  })
  title: string;

  @ApiProperty({
    description: 'The unique identifier of the video',
    example: 'Sample Video',
  })
  videoUrl: string;

  @ApiProperty({
    description: 'The thumbnail URL of the video',
    example: 'https://example.com/Samplethumbnail.jpg',
  })
  thumbnailUrl: string;

  @ApiProperty({
    description: 'The date when the video was published',
    example: '2023-01-01T00:00:00Z',
  })
  publishedAt: Date;

  @ApiProperty({
    description: 'The unique identifier of the user who uploaded the video',
    example: 'user123',
  })
  userId: string;

  @ApiProperty({
    description: 'The nickname of the user who uploaded the video',
    example: 'john_doe',
  })
  userNickname: string;

  @ApiProperty({
    description: 'Indicates if the current user is the owner of the video',
    example: true,
  })
  isOwner: boolean;

  @ApiProperty({
    description: 'Indicates if the current user is subscribed to the uploader',
    example: true,
  })
  isSubscribed: boolean;

  @ApiProperty({
    description: 'Indicates if the current user can subscribe to the uploader',
    example: true,
  })
  canSubscribe: boolean;
}

export class VideoMetadataListResponseDto {
  @ApiProperty({
    name: 'snippets',
    description: 'List of video metadata',
    type: [VideoMetadataSnippet],
  })
  snippet: VideoMetadataSnippet[];
}

export class VideoMetadataResponseDto {
  @ApiProperty({
    name: 'snippet',
    description: 'Video metadata',
    type: VideoMetadataSnippet,
  })
  snippet: VideoMetadataSnippet;
}
