import { Test, TestingModule } from '@nestjs/testing';
import { MyNumsController } from './my-nums.controller';

describe('MyNumsController', () => {
  let controller: MyNumsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyNumsController],
    }).compile();

    controller = module.get<MyNumsController>(MyNumsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
