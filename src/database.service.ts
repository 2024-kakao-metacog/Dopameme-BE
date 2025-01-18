// Prisma service
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from './config/database.config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    const databaseConfig = configService.get<DatabaseConfig>('database');
    const url = `postgresql://${encodeURIComponent(databaseConfig.username)}:${encodeURIComponent(databaseConfig.password)}@${encodeURIComponent(databaseConfig.host)}:${databaseConfig.port}/${encodeURIComponent(databaseConfig.database)}`;

    super({
      datasources: {
        db: {
          url: url,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
