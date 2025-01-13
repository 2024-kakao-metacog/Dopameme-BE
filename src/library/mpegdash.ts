import ffmpeg from 'fluent-ffmpeg';
import { basename, join } from 'path';

// const FfmpegPath = '/opt/homebrew/bin/ffmpeg';
// const ffmpeg = Ffmpeg(FfmpegPath);
// ffmpeg.setFfmpegPath(FfmpegPath);

export class MpegDash {
  static async createDash(inputFilePath: string, outputDir: string) {
    const inputFile = basename(inputFilePath);
    const outputManifestPath = join(outputDir, `${inputFile}-manifest.mpd`);
    console.log('input:', inputFile);
    console.log('path:', outputDir);

    const command = ffmpeg();
    command
      .addInput(inputFilePath)
      .addOutput(outputManifestPath)
      .addOptions([
        '-map 0:v:0',
        '-b:v:0 2000k',
        '-map 0:v:0',
        '-b:v:1 4000k',
        '-map 0:a',
        '-b:a:0 256k',
        '-f dash',
        '-seg_duration 10',
        '-use_template 1',
        '-use_timeline 1',
        `-init_seg_name ${inputFile}-init-stream$RepresentationID$.m4f`,
        `-media_seg_name ${inputFile}-chunk-stream$RepresentationID$-$Number%05d$.m4f`,
      ])
      .on('start', () => {
        console.log('Started processing');
      })
      .on('end', () => {
        console.log('Finished processing');
      })
      .on('error', (err, stdout, stderr) => {
        console.log('Error: ' + err.message);
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
      })
      .on('progress', (progress) => {
        console.log('Processing: ' + progress.percent + '% done');
      });

    command.run();
  }
}
