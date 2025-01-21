import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class FindVideoMetadataListDto {
  @IsInt()
  @Min(1, { message: 'Minimum value is 1' })
  @Max(20, { message: 'Maximum value is 20' })
  maxResults: number;
}

export class FindVideoMetadataDto {
  @IsString()
  @IsNotEmpty()
  videoUrl: string;
}
