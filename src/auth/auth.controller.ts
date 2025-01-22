import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Cookies } from './decorator/cookies.decorator';
import { Response } from 'express';
import { JwtRefreshGuard } from './guard/jwt-refresh.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Authenticate User' })
  @ApiBody({
    description: 'User login credentials',
    type: LoginUserDto,
  })
  @ApiCookieAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully',
  })
  async signIn(
    @Body() userLoginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(
      userLoginDto.userId,
      userLoginDto.password,
    );

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.authService.createAccessToken(user);
    const refreshToken = await this.authService.createRefreshToken(user);

    res.setHeader('Authorization', 'Bearer ' + accessToken);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
    });
  }

  @Put()
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh Authentication Token' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    description: 'The refresh token provided after initial authentication',
    type: String,
  })
  async refreshToken(
    @Cookies('refresh_token') refreshToken: string,
    @Res({ passthrough: true })
    res: Response,
  ) {
    const newAccessToken =
      await this.authService.refreshAccessToken(refreshToken);
    const newRefreshToken =
      await this.authService.refreshRefreshToken(refreshToken);

    if (newAccessToken === null || newRefreshToken === null) {
      throw new UnauthorizedException('Invalid User');
    }

    res.setHeader('Authorization', 'Bearer ' + newAccessToken);

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: false,
    });
  }

  // To Do
  @Delete()
  async signOut() {}
}
