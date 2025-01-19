import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class FrinedshipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  async findAll(id: string) {
    const redisClient = this.redis.getClient();
    const frinedships = await this.prisma.friend.findMany({
      where: {
        OR: [{ user1Id: id }, { user2Id: id }],
      },
      select: {
        user1: {
          select: {
            id: true,
            fullName: true,
          },
        },
        user2: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    });
    let x = [];
    for (const elm of frinedships) {
      let obj;
      if (elm.user1.id == id) {
        obj = {
          friendID: elm.user2.id,
          fullName: elm.user2.fullName,
        };
      } else {
        obj = {
          friendID: elm.user1.id,
          fullName: elm.user2.fullName,
        };
      }
      const online = await redisClient.hget('sockets', obj.friendID);
      if (online) {
        obj.online = true;
      } else {
        obj.online = false;
      }
      const chatBetween = await this.prisma.chat.findFirst({
        where: {
          users: {
            every: {
              userId: {
                in: [id, obj.friendID],
              },
            },
          },
        },
        select: {
          id: true,
        },
      });
      obj.chat = chatBetween.id;

      x.push(obj);
    }
    //console.log(x)
    //frinedships.forEach(async (elm) => {
    //  let obj;
    //});
    return x;
  }
}
