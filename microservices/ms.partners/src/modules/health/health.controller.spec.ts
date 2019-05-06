import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

let controller;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(
      {
          controllers: [HealthController],
      })
      .compile();

    controller = module.get<HealthController>(HealthController);
});

describe('.check()', () => {
    it('should tells everything is find 👍', async () => {
        const result = await controller.check();

        expect(result)
          .toEqual({ status: 'I am alive and well' });
    });
});
