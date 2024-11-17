import { Controller } from '@nestjs/common';
import { WsguardService } from './wsguard.service';

@Controller('wsguard')
export class WsguardController {
  constructor(private readonly wsguardService: WsguardService) {}
}
