import { Test, TestingModule } from '@nestjs/testing';
import { FrinedshipService } from './frinedship.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { RedisService } from 'src/redis/redis.service';

describe('FrinedshipService', () => {
  let service: FrinedshipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        FrinedshipService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    service = module.get<FrinedshipService>(FrinedshipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
