import { createReadStream, createWriteStream, stat } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const statAsync = promisify(stat);

export class MyFileSystem {
  static getFileStream(filePath: string) {
    return createReadStream(filePath);
  }

  static async getFileStat(fileName: string) {
    return statAsync(resolve(process.cwd(), fileName));
  }

  static saveFileStream(fileName: string, stream: NodeJS.ReadableStream) {
    const filePath = resolve(process.cwd(), fileName);
    const writable = createWriteStream(filePath);

    return new Promise<void>((resolve, reject) => {
      stream.pipe(writable);
      writable.on('finish', () => resolve());
      writable.on('error', (err) => reject(err));
    });
  }
}
