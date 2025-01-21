import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { FileUtil } from '../library/file';
import { Video, VideoMock } from './entity/Video.entity';
import { DatabaseService } from '../database.service';

@Injectable()
export class VideoService {
  readonly dummydataDir = resolve(process.cwd(), 'dummydata');

  constructor(private readonly prisma: DatabaseService) {}

  getVideoMetadataListDummy(maxResults: number): VideoMock[] {
    const sampleData = FileUtil.loadJson(
      join(this.dummydataDir, 'VideoMetadataList.json'),
    ) as VideoMock[];
    const results = sampleData.slice(0, maxResults);
    return results;
  }

  async getVideoMetadataListRandom(maxResults: number): Promise<Video[]> {
    const crwalCount = Math.floor(maxResults * 0.9);
    const notCrwalCount = maxResults - crwalCount;

    const videoMetadatasCrawl = await this.getRandomVideo(crwalCount, true);
    const videoMetadatasNotCrawl = await this.getRandomVideo(
      notCrwalCount,
      false,
    );

    const videoMetadatas = videoMetadatasCrawl.concat(videoMetadatasNotCrawl);

    return videoMetadatas.map((video) => {
      return {
        userId: video.userId,
        title: video.title,
        videoUrl: video.videoUrl,
        thumbnailUrl: video.thumbnailUrl,
        isCrawl: video.isCrawl,
        publishedAt: video.publishedAt,
      };
    });
  }

  async getRandomVideo(count: number, isCrawl: boolean): Promise<Video[]> {
    const randomPick = (values: string[]): string => {
      const index = Math.floor(Math.random() * values.length);
      return values[index];
    };

    const randomNumber = (min: number, max: number): number => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const itemCount = await this.prisma.video.count();

    if (itemCount === 0) {
      return [];
    }

    if (count > itemCount) {
      count = itemCount;
    }

    const orderBy = randomPick([
      'id',
      'userId',
      'title',
      'videoUrl',
      'thumbnailUrl',
      'publishedAt',
    ]);
    const orderDir = randomPick(['asc', 'desc']);

    const result = await this.prisma.video.findMany({
      where: {
        isCrawl,
      },
      orderBy: { [orderBy]: orderDir },
      take: count,
      skip: randomNumber(0, itemCount - 1),
      select: {
        userId: true,
        title: true,
        videoUrl: true,
        thumbnailUrl: true,
        isCrawl: true,
        publishedAt: true,
      },
    });

    return result || [];
  }

  async findVideoByVideoUrl(videoUrl: string): Promise<Video | null> {
    const video = await this.prisma.video.findFirst({
      where: { videoUrl },
    });

    if (video === null) {
      return null;
    }
    return {
      userId: video.userId,
      title: video.title,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl,
      isCrawl: video.isCrawl,
      publishedAt: video.publishedAt,
    };
  }
}
