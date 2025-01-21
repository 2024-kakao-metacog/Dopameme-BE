import { IsNotEmpty, IsString } from 'class-validator';

export class VideonameDto {
  @IsString()
  @IsNotEmpty()
  videoname: string;
}

export class VideoChunkDto {
  @IsString()
  @IsNotEmpty()
  chunk: string;
}
