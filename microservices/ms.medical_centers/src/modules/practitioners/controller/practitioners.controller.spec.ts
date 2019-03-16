import { Test, TestingModule } from '@nestjs/testing';
import { PractitionersController } from './practitioners.controller';

describe('Practitioners Controller', () => {
  let controller: PractitionersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionersController],
    }).compile();

    controller = module.get<PractitionersController>(PractitionersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
