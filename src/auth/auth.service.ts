import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { Algorithm } from 'jsonwebtoken';
import { JwtConfig } from '../config/jwt.config';

@Injectable()
export class AuthService {
  readonly privateKey: string;
  readonly publicKey: string;
  readonly algorithm: string;
  readonly accessExpiresIn: string;
  readonly refreshExpiresIn: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    const jwtConfig = configService.get<JwtConfig>('jwt');

    this.privateKey = jwtConfig.privateKey;
    this.algorithm = jwtConfig.algorithm;
    this.accessExpiresIn = jwtConfig.accessExpiresIn;
    this.refreshExpiresIn = jwtConfig.refreshExpiresIn;
  }

  async signIn(userId: string, password: string) {
    return await this.userService.findUserByUserIdAndUserPw(userId, password);
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      userId: user.userId,
      tokenType: 'access',
    };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.privateKey,
      expiresIn: this.accessExpiresIn,
      algorithm: this.algorithm as unknown as Algorithm,
    });

    return access_token;
  }

  async createRefreshToken(user: User): Promise<string> {
    const payload = {
      userId: user.userId,
      tokenType: 'refresh',
    };

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: this.privateKey,
      expiresIn: this.refreshExpiresIn,
      algorithm: this.algorithm as unknown as Algorithm,
    });

    return refresh_token;
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = await this.decodeToken(refreshToken);
    const user = await this.userService.findUserByUserId(payload.userId);

    if (user === null) {
      return null;
    }

    return this.createAccessToken(user);
  }

  async refreshRefreshToken(refreshToken: string) {
    const payload = await this.decodeToken(refreshToken);
    const user = await this.userService.findUserByUserId(payload.userId);

    if (user === null) {
      return null;
    }

    return this.createRefreshToken(user);
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token, {
      secret: this.privateKey,
      algorithms: [this.algorithm as unknown as Algorithm],
    });
  }
}
