import {
  createReadStream,
  createWriteStream,
  stat,
  readFileSync,
  existsSync,
} from 'fs';
import { promisify } from 'util';

const statAsync = promisify(stat);

export class FileUtil {
  static getFileStream(filePath: string) {
    return createReadStream(filePath);
  }

  static async getFileStat(fileName: string) {
    return statAsync(fileName);
  }

  static saveFileStream(fileName: string, stream: NodeJS.ReadableStream) {
    const writable = createWriteStream(fileName);

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

  static readFile(filePath: string) {
    return readFileSync(filePath);
  }

  static isExist(filePath: string) {
    return existsSync(filePath);
  }
}
