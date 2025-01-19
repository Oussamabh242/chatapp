import { Test, TestingModule } from '@nestjs/testing';
import { SssGateway } from './sss.gateway';
import { SssService } from './sss.service';

describe('SssGateway', () => {
  let gateway: SssGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SssGateway, SssService],
    }).compile();

    gateway = module.get<SssGateway>(SssGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
