import { Test, TestingModule } from '@nestjs/testing';
import { ChatRoomsService } from './chat-rooms.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('ChatRoomsService', () => {
  let service: ChatRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomsService, PrismaService, ConfigService],
    }).compile();

    service = module.get<ChatRoomsService>(ChatRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
