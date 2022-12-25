import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Num } from 'src/typeorm/entities/Num';
import { RegNumParams, UpdateNumParams } from 'src/utils/types';
import axios from 'axios';

@Injectable()
export class NumsService {
  constructor(@InjectRepository(Num) private numRepository: Repository<Num>) {}
  findNums() {
    return this.numRepository.find();
  }
  async findNumByDrwNo(drwNo: number) {
    const found = await this.numRepository.findBy({ drwNo });

    if (!found) {
      throw new NotFoundException(`Can't find Board with drwNo ${drwNo}`);
    }

    return found;
  }
  async regNum(regDetails: RegNumParams) {
    const newNum = this.numRepository.create({ ...regDetails });
    return this.numRepository.save(newNum);
  }
  updateNum(id: number, updateDetails: UpdateNumParams) {
    return this.numRepository.update({ id }, { ...updateDetails });
  }
  async requestDrwNo(drwNo: number) {
    const { data } = await axios
      .get(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`,
      )
      .catch((err) => {
        console.log(err);
        throw new ForbiddenException('API not available');
      });
    return data;
  }
}
