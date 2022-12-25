import { Test, TestingModule } from '@nestjs/testing';
import { NumsController } from './nums.controller';

describe('NumsController', () => {
  let controller: NumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NumsController],
    }).compile();

    controller = module.get<NumsController>(NumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
