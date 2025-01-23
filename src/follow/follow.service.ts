import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { Follow } from '@prisma/client';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: DatabaseService) {}

  async createFollow(fromUserId: number, toUserId: number): Promise<Follow> {
    const follow = await this.prisma.follow.findFirst({
      where: {
        followingUserId: fromUserId,
        followedUserId: toUserId,
      },
    });

    if (follow !== null) {
      throw new Error(`Already following`);
    }

    const newFollow = await this.prisma.follow.create({
      data: {
        followingUserId: fromUserId,
        followedUserId: toUserId,
        createdAt: new Date(),
      },
    });
    return newFollow;
  }

  async findFollowingsByUserId(fromUserId: number): Promise<Follow[]> {
    return await this.prisma.follow.findMany({
      where: {
        followingUserId: fromUserId,
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
