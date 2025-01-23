import { ApiProperty } from '@nestjs/swagger';

class FollowsSnippet {
  @ApiProperty({
    description: 'The unique identifier of the follow',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description:
      'The unique identifier of the user who is following another user',
    example: 10,
  })
  fromUserId: number;

  @ApiProperty({
    description: 'The unique identifier of the user who is being followed',
    example: 20,
  })
  toUserId: number;

  @ApiProperty({
    description: 'The date when the follow was created',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;
}

export class FollowsResponseDto {
  @ApiProperty({
    name: 'snippet',
    description: 'Follow',
    type: [FollowsSnippet],
  })
  snippet: FollowsSnippet[];
}

export class FollowResponseDto {
  @ApiProperty({
    name: 'snippet',
    description: 'Follow',
    type: FollowsSnippet,
  })
  snippet: FollowsSnippet;
}
