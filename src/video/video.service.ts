import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { FileUtil } from '../library/file';
import { VideoMetadataListResponseDto } from './dto/video-metadata-list-response.dto';

@Injectable()
export class VideoService {
  readonly dummydataDir = resolve(process.cwd(), 'dummydata');

  constructor() {}

  getVideoMetadatasDummy(maxResults: number): VideoMetadataListResponseDto[] {
    const sampleData = FileUtil.loadJson(
      join(this.dummydataDir, 'VideoMetadataList.json'),
    ) as VideoMetadataListResponseDto[];
    const results = sampleData.slice(0, maxResults);
    return results;
  }
}
