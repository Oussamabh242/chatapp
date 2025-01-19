import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost', // Redis server host (default: localhost)
      port: 6379, // Redis server port (default: 6379)
      db: 0, // Redis database index (optional, defaults to 0)
    });

    this.redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.redisClient.on('error', (error) => {
      console.error('Redis error:', error);
    });
  }

  getClient(): Redis {
    return this.redisClient;
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }
}
