import { Socket } from 'socket.io';
export class OnlineRegistery {
  private registry: Map<string, Socket>;
  constructor() {
    this.registry = new Map<string, Socket>();
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
    console.log(this.registry.keys());
  }
}
