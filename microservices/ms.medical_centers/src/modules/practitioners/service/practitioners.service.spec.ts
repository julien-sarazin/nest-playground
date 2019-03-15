import { Test, TestingModule } from '@nestjs/testing';
import PractitionersService from './practitioners.service';

describe('PractitionersService', () => {
  let service: PractitionersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PractitionersService],
    }).compile();

    service = module.get<PractitionersService>(PractitionersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
