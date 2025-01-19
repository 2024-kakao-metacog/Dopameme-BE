import {
  Controller,
  Get,
  Body,
  Put,
  Query,
  HttpStatus,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto/signup-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindUserDto } from './dto/find-user.dto';
import { valid } from '../library/class-validate';
import { AuthService } from '../auth/auth.service';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Put()
  @ApiOperation({ summary: 'Sign up User' })
  @ApiBody({
    description: 'User information required for signing up',
    type: SignupUserDto,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User ID or Nickname already exists',
  })
  async signUp(@Body() createUserDto: SignupUserDto): Promise<UserResponseDto> {
    try {
      const newUser = await this.userService.createUser({
        userId: createUserDto.userId,
        password: createUserDto.password,
        nickname: createUserDto.nickname,
      });

      return {
        snippet: {
          userId: newUser.userId,
          nickname: newUser.nickname,
          createdAt: newUser.createdAt,
        },
      };
    } catch (err) {
      if (err.message.startsWith('Duplicate field:')) {
        const field = err.message.split(':')[1].trim();
        throw new ConflictException(`${field} already exists`);
      } else {
        console.error(err);
        throw new InternalServerErrorException();
      }
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve User Details' })
  @ApiQuery({
    name: 'id',
    description: 'The unique identifier of the user',
    type: String,
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successfully retrieved user details',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user ID',
  })
  async getUser(@Query('id') userId: string): Promise<UserResponseDto> {
    await valid(FindUserDto, { userId });

    const user = await this.userService.findUserByUserId(userId);
    if (user === null) {
      throw new NotFoundException('User not found');
    }
    return {
      snippet: {
        userId: user.userId,
        nickname: user.nickname,
        createdAt: user.createdAt,
      },
    };
  }
}
