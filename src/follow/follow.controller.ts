import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Req,
  Query,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { AccessTokenGuard } from '../auth/guard/access-token.guard';
import { RefreshTokenGuard } from '../auth/guard/refresh-token.guard';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  FollowResponseDto,
  FollowsResponseDto,
} from './dto/follow-response.dto';
import { User } from '../user/entities/user.entity';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('followings')
  @ApiOperation({ summary: "Retrieve User's Following List" })
  @UseGuards(AccessTokenGuard, RefreshTokenGuard)
  @ApiBearerAuth('access_token')
  @ApiOkResponse({
    description: 'Successfully retrieved following list',
    type: FollowsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getFollowings(@Req() req: any): Promise<FollowsResponseDto> {
    const fromUser = req.user as User;

    const followings = await this.followService.findFollowingsByUserId(
      fromUser.id,
    );

    return {
      snippet: followings.map((follower) => ({
        id: follower.id,
        followedUserId: follower.followedUserId,
        followedNickname: follower.followedNickname,
        createdAt: follower.createdAt,
      })),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Follow User' })
  @UseGuards(AccessTokenGuard, RefreshTokenGuard)
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({
    description: 'Successfully followed',
    type: FollowsResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'Already following' })
  async followUser(
    @Req() req: any,
    @Query('userId') userId: string,
  ): Promise<FollowResponseDto> {
    const fromUser = req.user as User;

    try {
      return {
        snippet: await this.followService
          .createFollow(fromUser.id, userId)
          .then((follow) => ({
            id: follow.id,
            followedUserId: follow.followedUserId,
            followedNickname: follow.followedNickname,
            createdAt: follow.createdAt,
          })),
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Unfollow User' })
  @UseGuards(AccessTokenGuard, RefreshTokenGuard)
  @ApiBearerAuth('access_token')
  @ApiOkResponse({ description: 'Successfully unfollowed' })
  @ApiNotFoundResponse({ description: 'Not following user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async unfollowUser(@Req() req: any, @Query('followId') followId: number) {
    const fromUser = req.user as User;

    try {
      await this.followService.removeFollowingByUserIdAndId(
        fromUser.id,
        followId,
      );
    } catch (err) {
      if (err.message === 'Not following user') {
        throw new NotFoundException(err.message);
      }
      if (err.message === 'Unauthorized') {
        throw new UnauthorizedException(err.message);
      }
    }
  }
}
