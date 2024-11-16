import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseDto } from './dto/respond.dto';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { send } from 'process';

@Injectable()
export class RequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatRoomsService: ChatRoomsService,
  ) {}
  async sendRequest(uid: string, sender: string) {
    console.log('inside send requst ');
    const foundReqs = await this.prisma.request.findMany({
      where: {
        OR: [
          { AND: [{ senderId: sender }, { recivedId: uid }] },
          { AND: [{ senderId: uid }, { recivedId: sender }] },
        ],
      },
    });
    if (foundReqs.length != 0) {
      console.log('found request pending betwenn two users');
      throw new BadRequestException('Invalid request data!');
    }
    const foundfriends = await this.prisma.friend.findMany({
      where: {
        OR: [
          { AND: [{ user1: uid }, { user2: sender }] },
          { AND: [{ user1: sender }, { user2: uid }] },
        ],
      },
    });
    if (foundfriends.length != 0) {
      console.log('foundfriends between the two ');
      throw new BadRequestException('Invalid request data');
    }
    const request = await this.prisma.request.create({
      data: {
        senderId: sender,
        recivedId: uid,
      },
    });
    return request;
  }

  async getRequests(id: string) {
    const requests = await this.prisma.request.findMany({
      where: {
        recivedId: id,
        status: 'pending',
      },
      select: {
        id: true,
        sender: {
          select: {
            fullName: true,
            id: true,
          },
        },
        date: true,
      },
    });
    return requests;
  }
  async handleResponse(response: ResponseDto, userid: string) {
    if (response.response === true) {
      const x = await this.prisma.request.findUnique({
        where: { id: response.reqid },
      });
      await this.prisma.request.delete({ where: { id: response.reqid } });
      const friendship = await this.prisma.friend.create({
        data: {
          user1: x.recivedId,
          user2: x.senderId,
        },
      });
      await this.acceptRequest([friendship.user1, friendship.user2]);
      return 'you acceppted the request';
    } else {
      this.refuseRequest(response.reqid, userid);
      return 'you refused the request';
    }
  }
  async acceptRequest(subs: string[]) {
    const chat = await this.chatRoomsService.createRoom(subs);
    await this.chatRoomsService.addUserToChat(subs, chat.id);
  }

  async refuseRequest(reqid: string, uid: string) {
    return await this.prisma.request.delete({
      where: {
        id: reqid,
        recivedId: uid,
      },
    });
  }

  async getUsersByName(name: string, thisUser: string) {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          not: thisUser,
        },
        fullName: {
          contains: name,
          mode: 'insensitive',
        },
        friendships: {
          none: {
            OR: [{ reciver: { id: thisUser } }, { sender: { id: thisUser } }],
          },
        },
      },
      select: {
        fullName: true,
        id: true,
      },
    });
    return users || [];
  }
}
