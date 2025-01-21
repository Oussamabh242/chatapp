console.log(__dirname);

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
import { logUser } from '../utlis';

describe('RequestController', () => {
  //let controller: RequestController;
  let app: INestApplication;

  let prisma: PrismaService;
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
  afterAll(async () => {
    prisma = app.get(PrismaService);
    await prisma.$disconnect();
    await app.close();
  });

  it('[GET] rqeusts', async () => {
    const auth = await logUser(app, {
      email: 'oussama@gmail.com',
      password: 'oussama.bh',
    });

    const token = auth.accessToken;

    expect(token).toBeDefined();
    const reqs = await request(app.getHttpServer())
      .get('/request')
      .auth(token, { type: 'bearer' });
    expect(reqs.body.data).toBeDefined();
    expect(reqs.body.data.length).toBe(1);
  });
});
