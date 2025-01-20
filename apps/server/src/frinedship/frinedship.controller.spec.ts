import { Test, TestingModule } from '@nestjs/testing';
import { FrinedshipController } from './frinedship.controller';
import { FrinedshipService } from './frinedship.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

describe('FrinedshipController', () => {
  let controller: FrinedshipController;
  let prismaService: PrismaService;
  let redisService: RedisService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrinedshipController],
      providers: [
        FrinedshipService,
        PrismaService,
        RedisService,
        ConfigService,
      ],
      imports: [JwtModule],
    }).compile();

    controller = module.get<FrinedshipController>(FrinedshipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
