import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class FindUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'Richard123',
  })
  @IsString()
  @Length(2, 16, {
    message: 'User Id must be between 4 and 16 characters',
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'User ID must contain only letters and numbers',
  })
  userId: string;
}
