import { Module } from '@nestjs/common';
import { SssService } from './sss.service';
import { SssGateway } from './sss.gateway';
import { RedisModule } from 'src/redis/redis.module';
import { RedisService } from 'src/redis/redis.service';
import { MessagesModule } from 'src/messages/messages.module';
import { OnlineRegistery } from 'src/online/online.registery';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MessagesModule],
  providers: [
    SssGateway,
    SssService,
    RedisService,
    OnlineRegistery,
    PrismaService,
  ],
})
export class SssModule {}
