import { Test, TestingModule } from '@nestjs/testing';
import { RequestService } from './request.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatRoomsModule } from 'src/chat-rooms/chat-rooms.module';
import { RequestController } from './request.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

describe('RequestService', () => {
  let service: RequestService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ChatRoomsModule],
      controllers: [RequestController],
      providers: [RequestService, PrismaService, ConfigService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<RequestService>(RequestService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('get Requests', () => {
    it('should return one request', async () => {
      //const test_user = 'cm62vkx160001i04rexetnfq9';
      const data = [
        {
          date: new Date('2025-01-20T19:23:33.898Z'),
          id: 'cm65fpe2y0001i0pwnwe6ecx2',
          userfrom: {
            fullName: 'oussama',
            id: 'cm65fgh1u0000i07jp7mh8ny9',
          },
        },
      ];
      const expected = {
        code: 200,
        data: data,
      };

      expect(prisma.request).toBeDefined();
      prisma.request.findMany.mockResolvedValueOnce(data as any);
      const response = await service.getRequests('id');
      expect(response).toStrictEqual(expected);
    });
  });
});
