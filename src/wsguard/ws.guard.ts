import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
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
    return true;
  }

  private extractTokenFromHandshake(client: Socket): string | undefined {
    const token = client.handshake.query['token'] as string;
    return token;
  }
}
