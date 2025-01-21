import { Injectable } from '@nestjs/common';
import { join, resolve } from 'path';
import { FileUtil } from '../library/file';
import { VideoMock } from './entity/Video.entity';

@Injectable()
export class VideoService {
  readonly dummydataDir = resolve(process.cwd(), 'dummydata');

  constructor() {}

  getVideoMetadatasDummy(maxResults: number): VideoMock[] {
    const sampleData = FileUtil.loadJson(
      join(this.dummydataDir, 'VideoMetadataList.json'),
    ) as VideoMock[];
    const results = sampleData.slice(0, maxResults);
    return results;
  }
}
