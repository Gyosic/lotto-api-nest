import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyNum } from 'src/typeorm/entities/myNum';
import { CreateMyNumParams } from 'src/utils/types';

@Injectable()
export class MyNumsService {
  constructor(
    @InjectRepository(MyNum) private myNumRepository: Repository<MyNum>,
  ) {}
  async createMyNum(createDetails: CreateMyNumParams) {
    const myNum = this.myNumRepository.create({ ...createDetails });
    return this.myNumRepository.save(myNum);
  }
}
