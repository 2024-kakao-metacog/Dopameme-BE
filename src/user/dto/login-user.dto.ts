import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'richard',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 16, {
    message: 'User Id must be between 4 and 16 characters',
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'User ID must contain only letters and numbers',
  })
  userId: string;

  @ApiProperty({
    description: 'User password',
    example: 'Password',
  })
  @IsString()
  @IsNotEmpty()
  @Length(4, 16, {
    message: 'Password must be between 4 and 16 characters',
  })
  @Matches(/^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"\'<>,.?/\\|-]*$/, {
    message:
      'Password must contain only letters, numbers, and special characters',
  })
  password: string;
}
