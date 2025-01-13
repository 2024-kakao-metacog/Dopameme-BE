import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';
import { join, resolve } from 'path';
import { MyFileSystem } from 'src/library/file';
import { MpegDash } from 'src/library/mpegdash';

@Injectable()
export class VideostreamService {
  readonly inputFilePath = resolve(process.cwd(), 'videofile', 'uploads');
  readonly outputDir = resolve(process.cwd(), 'videofile', 'output');

  constructor() {}

  encodeVideoStream(filename: string) {
    MpegDash.createDash(join(this.inputFilePath, filename), this.outputDir);
  }

  saveVideoStream(filename: string, stream: ReadStream) {
    MyFileSystem.saveFileStream(join(this.outputDir, filename), stream);
  }

  getVideoStream(filename: string): ReadStream {
    return MyFileSystem.getFileStream(join(this.outputDir, filename));
  }

  getVideoStat(filename: string) {
    return MyFileSystem.getFileStat(join(this.outputDir, filename));
  }
}
