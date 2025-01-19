import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async makeChat(user1id: string, user2id: string) {
    try {
      const user1 = await this.prisma.user.findUnique({
        where: {
          id: user1id,
        },
        select: {
          fullName: true,
          id: true,
        },
      });
      const user2 = await this.prisma.user.findUnique({
        where: {
          id: user2id,
        },
        select: {
          fullName: true,
          id: true,
        },
      });
      const chatName = user1.fullName + '--' + user2.fullName;
      const chat = await this.prisma.chat.create({
        data: {
          name: chatName,
        },
      });
      await this.prisma.chatUser.create({
        data: {
          userId: user1.id,
          chatId: chat.id,
        },
      });
      await this.prisma.chatUser.create({
        data: {
          userId: user2.id,
          chatId: chat.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
