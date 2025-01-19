import { Module } from '@nestjs/common';
import { WsguardService } from './wsguard.service';
import { WsguardController } from './wsguard.controller';

@Module({
  controllers: [WsguardController],
  providers: [WsguardService],
})
export class WsguardModule {}
