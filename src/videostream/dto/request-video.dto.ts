import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VideonameDto {
  @ApiProperty({
    description: 'Name of the video to request',
    example: 'video1',
  })
  @IsString()
  @IsNotEmpty()
  videoname: string;
}

export class VideoChunkDto {
  @ApiProperty({
    description: 'Name of the video chunk to request',
    example: 'chunk1',
  })
  @IsString()
  @IsNotEmpty()
  chunk: string;
}
