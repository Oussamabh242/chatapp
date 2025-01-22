import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
//import { SigninRequest } from 'shared-types';

export async function logUser(app: INestApplication, payload: any) {
  const auth = await request(app.getHttpServer())
    .post('/auth/login')
    .send(payload)
    .expect(201);
  return auth.body;
}
