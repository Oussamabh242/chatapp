import { Test, TestingModule } from '@nestjs/testing';
import { WsguardController } from './wsguard.controller';
import { WsguardService } from './wsguard.service';

describe('WsguardController', () => {
  let controller: WsguardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WsguardController],
      providers: [WsguardService],
    }).compile();

    controller = module.get<WsguardController>(WsguardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
