import { Test, TestingModule } from '@nestjs/testing';
import { MyNumsService } from './my-nums.service';

describe('MyNumsService', () => {
  let service: MyNumsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyNumsService],
    }).compile();

    service = module.get<MyNumsService>(MyNumsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
