import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { SssService } from './sss.service';
import { UpdateSssDto } from './dto/update-sss.dto';
import { AuthGuard } from 'src/wsguard/ws.guard';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { OnlineRegistery } from 'src/online/online.registery';
import { RedisService } from 'src/redis/redis.service';

import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
@WebSocketGateway(3322, {
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class SssGateway implements OnGatewayConnection {
  private onlineRegistery: OnlineRegistery;
  constructor(
    private readonly sssService: SssService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly messageService: MessagesService,
  ) {
    this.onlineRegistery = new OnlineRegistery();
  }
  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token = this.extractTokenFromHandshake(client);
      if (!token) {
        throw new UnauthorizedException('access token is not provided');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET_KEY,
        });
        client['user'] = payload.uid;
      } catch {
        throw new UnauthorizedException('problem with the access token');
      }
      //console.log(client);
      this.onlineRegistery.addClient(client['user'], client);
      this.onlineRegistery.all();
      console.log(client['user'], client.id);
      this.redisService.getClient().hset('sockets', client['user'], client.id);
    } catch (err) {
      console.log(err);
      client.disconnect();
    }
  }

  @SubscribeMessage('createSss')
  async create(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    //console.log("emit here")
    const userid = client['user'];
    const socketId = await this.redisService
      .getClient()
      .hget('sockets', userid);
    const sock = this.server.sockets.sockets.get(socketId);
    const message = {
      chatid: data.chatid,
      text: data.text,
    };
    await this.messageService.sendMessage(message, userid);
    sock.emit('new_message', 'new message in ' + data.chatid);
  }

  @SubscribeMessage('findAllSss')
  findAll() {
    return this.sssService.findAll();
  }

  @SubscribeMessage('findOneSss')
  findOne(@MessageBody() id: number) {
    return this.sssService.findOne(id);
  }

  @SubscribeMessage('updateSss')
  update(@MessageBody() updateSssDto: UpdateSssDto) {
    return this.sssService.update(updateSssDto.id, updateSssDto);
  }

  @SubscribeMessage('removeSss')
  remove(@MessageBody() id: number) {
    return this.sssService.remove(id);
  }
  private extractTokenFromHandshake(client: Socket): string | undefined {
    const token = client.handshake.query['token'] as string;
    return token;
  }
}
