import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { hashPassword } from '../library/password';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaErrorCode } from '../database.errorcode.enum';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(newUser: {
    userId: string;
    password: string;
    nickname: string;
  }): Promise<User> {
    try {
      const user: User = await this.prisma.user.create({
        data: {
          userId: newUser.userId,
          passwordHash: await hashPassword(newUser.password),
          nickname: newUser.nickname,
          createdAt: new Date(),
        },
      });
      return {
        userId: user.userId,
        passwordHash: '',
        nickname: user.nickname,
        createdAt: user.createdAt,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case PrismaErrorCode.UniqueConstraintFailed:
            if (error.code === PrismaErrorCode.UniqueConstraintFailed) {
              const targetField = error.meta.target[0];
              throw new Error(`Duplicate field: ${targetField}`);
            }
          default:
            throw new Error('An unknown error occurred');
        }
      }
    }
  }

  async findUserByUserIdAndUserPw(
    userId: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
        passwordHash: await hashPassword(password),
      },
    });

    if (user === null) {
      return null;
    }
    return {
      userId: user.userId,
      passwordHash: '',
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  }

  async findUserByUserId(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (user === null) {
      return null;
    }
    return {
      userId: user.userId,
      passwordHash: '',
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (user === null) {
      return null;
    }
    return {
      userId: user.userId,
      passwordHash: '',
      nickname: user.nickname,
      createdAt: user.createdAt,
    };
  }
}
