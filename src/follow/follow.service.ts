import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { UserService } from '../user/user.service';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    private readonly prisma: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async createFollow(
    fromUserId_idx: number,
    toUserId: string,
  ): Promise<Follow> {
    const toUser = await this.userService.findUserByUserId(toUserId);

    if (toUser === null) {
      throw new Error(`User not found`);
    }

    const follow = await this.prisma.follow.findFirst({
      where: {
        followingUserId: fromUserId_idx,
        followedUserId: toUser.id,
      },
    });

    if (follow !== null) {
      throw new Error(`Already following`);
    }

    const newFollow = await this.prisma.follow.create({
      data: {
        followingUserId: fromUserId_idx,
        followedUserId: toUser.id,
        createdAt: new Date(),
      },
    });
    return {
      id: newFollow.id,
      followedUserId: toUser.userId,
      followedNickname: toUser.nickname,
      createdAt: newFollow.createdAt,
    };
  }

  async findFollowingsByUserId(fromUserId: number): Promise<Follow[]> {
    const follows = await this.prisma.follow.findMany({
      where: {
        followingUserId: fromUserId,
      },
    });

    return await Promise.all(
      follows.map(async (follow) => {
        const followed = await this.userService.findUserById(
          follow.followedUserId,
        );
        return {
          id: follow.id,
          followedUserId: followed.userId,
          followedNickname: followed.nickname,
          createdAt: follow.createdAt,
        };
      }),
    );
  }

  async removeFollowingByUserIdAndId(
    userId: number,
    followId: number,
  ): Promise<void> {
    const follow = await this.prisma.follow.findUnique({
      where: {
        id: followId,
      },
    });

    if (follow === null) {
      throw new Error(`Not following user`);
    }
    if (follow.followingUserId !== userId) {
      throw new Error(`Unauthorized`);
    }

    await this.prisma.follow.delete({
      where: {
        id: followId,
      },
    });
  }

  async removeFollowingByFromUserIdAndToUserId(
    fromUserId: number,
    toUserId: number,
  ): Promise<void> {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followingUserId: fromUserId,
        followedUserId: toUserId,
      },
    });

    if (follow === null) {
      throw new Error(`Not following user`);
    }

    await this.prisma.follow.delete({
      where: {
        id: follow.id,
      },
    });
  }
}
