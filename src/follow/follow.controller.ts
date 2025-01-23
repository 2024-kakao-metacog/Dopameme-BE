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
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  FollowResponseDto,
  FollowsResponseDto,
} from './dto/follow-response.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get('followings')
  @ApiOperation({ summary: "Retrieve User's Following List" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOkResponse({
    description: 'Successfully retrieved following list',
    type: FollowsResponseDto,
  })
  async getFollowings(@Req() req: any): Promise<FollowsResponseDto> {
    const fromUserId = req.user;
    const followings =
      await this.followService.findFollowingsByUserId(fromUserId);

    return {
      snippet: followings.map((follower) => ({
        id: follower.id,
        fromUserId: follower.followingUserId,
        toUserId: follower.followedUserId,
        createdAt: follower.createdAt,
      })),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Follow User' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiCreatedResponse({
    description: 'Successfully followed',
    type: FollowsResponseDto,
  })
  @ApiConflictResponse({ description: 'Already following' })
  async followUser(
    @Req() req: any,
    @Query('followerId') toUserId: number,
  ): Promise<FollowResponseDto> {
    const fromUserId = req.user;

    try {
      return {
        snippet: await this.followService
          .createFollow(fromUserId, toUserId)
          .then((follow) => ({
            id: follow.id,
            fromUserId: follow.followingUserId,
            toUserId: follow.followedUserId,
            createdAt: follow.createdAt,
          })),
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  @Delete()
  @ApiOperation({ summary: 'Unfollow User' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiNotFoundResponse({ description: 'Not following user' })
  async unfollowUser(@Req() req: any, @Query('followerId') toUserId: number) {
    const fromUserId = req.user;

    try {
      await this.followService.removeFollowingByFromUserIdAndToUserId(
        fromUserId,
        toUserId,
      );
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
