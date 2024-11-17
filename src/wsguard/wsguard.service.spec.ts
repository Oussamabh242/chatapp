import { Test, TestingModule } from '@nestjs/testing';
import { WsguardService } from './wsguard.service';

describe('WsguardService', () => {
  let service: WsguardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WsguardService],
    }).compile();

    service = module.get<WsguardService>(WsguardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
