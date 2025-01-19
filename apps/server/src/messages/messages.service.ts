import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(
    textSend: { chatid: string; text: string },
    userId: string,
  ) {
    try {
      const message = await this.prisma.message.create({
        data: {
          chatId: textSend.chatid,
          senderId: userId,
          text: textSend.text,
        },
      });
      return 'message sent successfully';
    } catch {
      return 'error while sending the message';
    }
  }
  async getMessages(chatId: string, userid: string) {
    const insideChat = await this.chekcUser(userid, chatId);
    if (!insideChat) {
      console.log('something worng here');
      throw new ForbiddenException('user is not in chat');
    }
    const chatInfo = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      select: {
        messages: {
          select: {
            text: true,
            sender: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
      },
    });
    return chatInfo;
  }

  async chekcUser(userid: string, chatid: string) {
    const res = await this.prisma.chatUser.findMany({
      where: {
        chatId: chatid,
        userId: userid,
      },
    });
    return res.length > 0;
  }
}
