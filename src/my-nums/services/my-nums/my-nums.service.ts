import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { MyNum } from 'src/typeorm/entities/MyNum';
import { CreateMyNumParams, FindPickedNumsParams } from 'src/utils/types';

@Injectable()
export class MyNumsService {
  constructor(
    @InjectRepository(MyNum) private myNumRepository: Repository<MyNum>,
  ) {}
  async findPickedNums(query: FindPickedNumsParams) {
    const { sdate, edate } = query;
    const find = await this.myNumRepository.find({
      where: { createdAt: Between(sdate, edate) },
    });
    return find;
  }

  async createMyNum(createDetails: CreateMyNumParams) {
    const myNum = this.myNumRepository.create({ ...createDetails });
    return this.myNumRepository.save(myNum);
  }
}
