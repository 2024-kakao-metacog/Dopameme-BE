import { ApiProperty } from '@nestjs/swagger';

class UserResponseSnippet {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: '10',
  })
  id: number;

  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 'abc123',
  })
  userId: string;

  @ApiProperty({
    description: 'The nickname of the user',
    example: 'john_doe',
  })
  nickname: string;

  @ApiProperty({
    description: 'The creation date of the user account',
    example: '2023-01-01T00:00:00Z',
  })
  createdAt: Date;
}

export class UserResponseDto {
  @ApiProperty({
    name: 'snippet',
    description: 'Snippet containing user details',
    type: () => UserResponseSnippet,
  })
  snippet: UserResponseSnippet;
}
