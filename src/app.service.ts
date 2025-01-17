import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/app.config';

@Injectable()
export class AppService {
  private readonly mode: string;
  private readonly port: number;
  private readonly host: string;
  private readonly entrypoint: string;

  constructor(private configService: ConfigService) {
    const appConfig = this.configService.get<AppConfig>('app');

    this.mode = appConfig.mode;
    this.port = appConfig.port;
    this.host = appConfig.host;
    this.entrypoint = appConfig.entrypoint;
  }

  getServerInfo(): string {
    return `[Mode: ${this.mode}] 🚀 Server is running at ${this.host}:${this.port}/${this.entrypoint}`;
  }

  getWelcomeMessage(): string {
    return `🎉 Welcome to Dopameme's Service With CICD !!! 🎉 <br>
    Start here → ${this.entrypoint}`;
  }
}
