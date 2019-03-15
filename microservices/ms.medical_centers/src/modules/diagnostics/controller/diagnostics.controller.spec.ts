import { Test, TestingModule } from '@nestjs/testing';
import { DiagnosticsController } from './diagnostics.controller';

describe('Diagnostics Controller', () => {
  let controller: DiagnosticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiagnosticsController],
    }).compile();

    controller = module.get<DiagnosticsController>(DiagnosticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
