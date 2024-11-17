import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OnlineRegistery {
  private registry: Map<string, Socket>;
  constructor() {
    this.registry = new Map<string, Socket>();
    console.log('started');
  }
  addClient(id: string, socket: Socket): void {
    this.registry.set(id, socket);
  }
  removeClient(id: string): void {
    this.registry.delete(id);
  }
  getClient(id: string): Socket {
    return this.registry.get(id);
  }
  all() {
    return;
  }
}
