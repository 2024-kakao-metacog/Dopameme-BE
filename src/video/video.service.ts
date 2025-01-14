import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { MyFileSystem } from '../library/file';

export interface VideoMetadata {
  snippet: {
    videoId: string;
    title: string;
    thumbnailUrl: string;
    publishedAt: string;
    userId: string;
    userNickname: string;
    isOwner: boolean;
    isSubscribed: boolean;
    canSubscribe: boolean;
  };
}

@Injectable()
export class VideoService {
  readonly dummydataDir = resolve(process.cwd(), 'dummydata');

  constructor() {}

  getVideoMetadatasDummy(maxResults: number = 5): VideoMetadata[] {
    const sampleData = MyFileSystem.loadJson(
      join(this.dummydataDir, 'VideoMetadataList.json'),
    ) as VideoMetadata[];
    const results = maxResults ? sampleData.slice(0, maxResults) : sampleData;
    return results;
  }
}
