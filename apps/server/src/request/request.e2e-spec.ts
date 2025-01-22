import { Test, TestingModule } from '@nestjs/testing';
import { RequestController } from '../../src/request/request.controller';
import { RequestService } from '../../src/request/request.service';
import { AuthModule } from '../../src/auth/auth.module';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { ChatRoomsModule } from '../../src/chat-rooms/chat-rooms.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('RequestController', () => {
  //let controller: RequestController;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, PrismaModule, ChatRoomsModule],
      controllers: [RequestController],
      providers: [RequestService, PrismaService, ConfigService],
    }).compile();

    //controller = module.get<RequestController>(RequestController);
    app = module.createNestApplication();
    await app.init();
  });

  it('[GET] rqeusts', async () => {
    const auth = await request(app.getHttpServer())
      .post('/auth')
      .send({ email: 'oussama@gmail.com', password: 'oussama.bh' });
    const token = auth.body.accessToken;
    expect(token).toBe('sometoken');
  });
});
