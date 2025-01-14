import { createReadStream, createWriteStream, stat, readFileSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

const statAsync = promisify(stat);

export class MyFileSystem {
  static getFileStream(filePath: string) {
    return createReadStream(filePath);
  }

  // To Do: Remove Dependency on process.cwd()
  static async getFileStat(fileName: string) {
    return statAsync(resolve(process.cwd(), fileName));
  }

    // To Do: Remove Dependency on process.cwd()
  static saveFileStream(fileName: string, stream: NodeJS.ReadableStream) {
    const filePath = resolve(process.cwd(), fileName);
    const writable = createWriteStream(filePath);

    return new Promise<void>((resolve, reject) => {
      stream.pipe(writable);
      writable.on('finish', () => resolve());
      writable.on('error', (err) => reject(err));
    });
  }

  static loadJson(filePath: string) {
    const fileData = readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  }
}
