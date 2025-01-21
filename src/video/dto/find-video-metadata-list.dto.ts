import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class FindVideoMetadataListDto {
  @ApiProperty({
    name: 'maxResults',
    required: false,
    description: 'The maximum number of results to retrieve',
    example: 5,
  })
  @IsInt()
  @Min(1, { message: 'Minimum value is 1' })
  @Max(20, { message: 'Maximum value is 20' })
  maxResults: number;
}