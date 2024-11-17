import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { MessagesModule } from './messages/messages.module';
import { FrinedshipModule } from './frinedship/frinedship.module';
import { ChatModule } from './chat/chat.module';
import { SssModule } from './sss/sss.module';
import { WsguardModule } from './wsguard/wsguard.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RequestModule,
    ChatRoomsModule,
    MessagesModule,
    FrinedshipModule,
    ChatModule,
    SssModule,
    WsguardModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
