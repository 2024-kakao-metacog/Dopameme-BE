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
import { JwtAccessTokenGuard } from './guard/access-token.guard';
import { JwtRefreshTokenGuard } from './guard/refresh-token.guard';
import { Cookies } from './decorator/cookies.decorator';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get()
  // @ApiOperation({ summary: 'Debug Authentication Tokens' })
  // async debugTokens(@Req() req: Request) {
  //   const cookies = req.get('cookie');
  //   const accessToken = getCookieValue(cookies, 'access_token');
  //   const refreshToken = getCookieValue(cookies, 'refresh_token');
  // }

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

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false, // Set to true in production
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
    });
  }

  @Put()
  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
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

    res.cookie('access_token', newAccessToken, {
      httpOnly: true,
      secure: true,
    });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  // To Do
  @Delete()
  @UseGuards(JwtAccessTokenGuard)
  @UseGuards(JwtRefreshTokenGuard)
  async signOut() {}
}
