import { Test, TestingModule } from '@nestjs/testing';
import { SssGateway } from './sss.gateway';
import { SssService } from './sss.service';
import { MessagesModule } from 'src/messages/messages.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisService } from 'src/redis/redis.service';
import { OnlineRegistery } from 'src/online/online.registery';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('SssGateway', () => {
  let gateway: SssGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MessagesModule, PrismaModule],
      providers: [
        SssGateway,
        SssService,
        RedisService,
        OnlineRegistery,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    gateway = module.get<SssGateway>(SssGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
