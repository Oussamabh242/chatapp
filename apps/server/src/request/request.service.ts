import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { ReqResponseDto } from './dto/respond.dto';
import { error } from 'console';

type Return_t<T> = {
  error?: string;
  code: number;
  data?: T;
};

type DataSendRequest = {
  user1Id: string;
  user2Id: string;
};
type DataGetRequests = {
  id: string;
  date: Date;
  userfrom: {
    id: string;
    fullName: string;
  };
};

type DataUserInfo = {
  id: string;
  fullName: string;
};

@Injectable()
export class RequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly chatRoomsService: ChatRoomsService,
  ) {}
  async sendRequest(
    uid: string,
    sender: string,
  ): Promise<Return_t<DataSendRequest>> {
    const [user1Id, user2Id] = sender < uid ? [sender, uid] : [uid, sender];
    const foundfriends = await this.prisma.friend.findMany({
      where: {
        AND: [{ user1Id: user1Id }, { user2Id: user2Id }],
      },
      select: {
        id: true,
      },
    });
    if (foundfriends.length != 0) {
      return {
        code: 409,
        error: '[Conflict] You are already friend with this user',
      };
    }
    try {
      const request = await this.prisma.request.create({
        data: {
          user1Id: user1Id,
          user2Id: user2Id,
          from: sender,
          to: uid,
        },
        select: {
          user1Id: true,
          user2Id: true,
        },
      });
      return {
        code: 201,
        data: request,
      };
    } catch (err) {
      if (err.code == 'P2002') {
        return {
          code: 409,
          error: '[Confilict] Requests found between the two users',
        };
      }
      console.error(err);
      return {
        code: 500,
        error: '[Server Error] something went wrong',
      };
    }
  }

  async getRequests(id: string): Promise<Return_t<DataGetRequests[]>> {
    try {
      const requests = await this.prisma.request.findMany({
        where: {
          to: id,
        },
        select: {
          id: true,
          userfrom: {
            select: {
              fullName: true,
              id: true,
            },
          },
          date: true,
        },
      });
      return {
        code: 200,
        data: requests,
      };
    } catch (err) {
      console.error(err);
      return {
        code: 500,
        error: '[Server Error] something wnent wrong',
      };
    }
  }
  async handleResponse(
    response: ReqResponseDto,
    userid: string,
  ): Promise<Return_t<string>> {
    if (response.response === true) {
      try {
        const deletedRequest = await this.prisma.request.delete({
          where: { id: response.reqid },
        });
        const [user1Id, user2Id] = [
          deletedRequest.user1Id,
          deletedRequest.user2Id,
        ];

        try {
          const friendship = await this.prisma.friend.create({
            data: {
              user1Id: user1Id,
              user2Id: user2Id,
            },
          });
          await this.acceptRequest([friendship.user1Id, friendship.user2Id]);
          return {
            data: 'you Accepted the request',
            code: 201,
          };
        } catch (err) {
          if (err.code === 'P2002') {
            return {
              code: 404,
              error: '[Conflict] friendship between two users already exists',
            };
          }
          console.error(err);
          return {
            code: 500,
            error: '[Server Error] something went wrong',
          };
        }
      } catch (err) {}
    } else {
      this.refuseRequest(response.reqid);
      return {
        data: 'you refused the request',
        code: 201,
      };
    }
  }
  async acceptRequest(subs: string[]) {
    const chat = await this.chatRoomsService.createRoom(subs);
    await this.chatRoomsService.addUserToChat(subs, chat.id);
  }

  async refuseRequest(reqid: string) {
    return await this.prisma.request.delete({
      where: {
        id: reqid,
      },
    });
  }

  async getUsersByName(
    name: string,
    thisUser: string,
  ): Promise<Return_t<DataUserInfo[]>> {
    try {
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
              OR: [{ user1: { id: thisUser } }, { user2: { id: thisUser } }],
            },
          },
        },
        select: {
          fullName: true,
          id: true,
        },
      });
      return {
        code: 200,
        data: users,
      };
    } catch (err) {
      console.log(err);
      return {
        code: 500,
        error: '[Server Error] something wnent wrong',
      };
    }
  }
}
