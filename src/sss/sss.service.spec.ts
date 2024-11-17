import { Test, TestingModule } from '@nestjs/testing';
import { SssService } from './sss.service';

describe('SssService', () => {
  let service: SssService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SssService],
    }).compile();

    service = module.get<SssService>(SssService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
