import { IsString, Length, Matches } from 'class-validator';

export class FindUserDto {
  @IsString()
  @Length(2, 16, {
    message: 'User Id must be between 4 and 16 characters',
  })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'User ID must contain only letters and numbers',
  })
  userId: string;
}
