import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { RegNumDto } from 'src/nums/dtos/RegNum.dto';
import { UpdateNumDto } from 'src/nums/dtos/UpdateNum.dto copy';
import { NumsService } from '../../services/nums/nums.service';

@Controller('nums')
export class NumsController {
  constructor(private numService: NumsService) {}
  @Get()
  getNums() {
    return this.numService.findNums();
  }

  @Get(':drwNo')
  async getNumById(@Param('drwNo') drwNo: number) {
    const data = await this.numService.findNumByDrwNo(drwNo);
    if (!data.length) {
      const { returnValue, ..._data } = await this.numService.requestDrwNo(
        drwNo,
      );
      if (returnValue === 'fail') return [{ returnValue: 'fail' }];
      else {
        this.numService.regNum({ returnValue, ..._data });
        return [{ returnValue, ..._data }];
      }
    } else {
      const [dbData] = data;
      const { returnValue, ...reqData } = await this.numService.requestDrwNo(
        drwNo,
      );
      if (dbData.firstWinamnt !== reqData.firstWinamnt) {
        await this.numService.updateNum(dbData.id, { returnValue, ...reqData });
      }
    }
    return this.numService.findNumByDrwNo(drwNo);
  }

  @Post(':drwNo')
  async regNum(@Param('drwNo') drwNo: number) {
    const data = await this.numService.requestDrwNo(drwNo);

    return this.numService.regNum(data);
  }

  @Put(':id')
  async updateNum(@Param('id', ParseIntPipe) id: number) {
    const data = await this.numService.requestDrwNo(id);
    await this.numService.updateNum(id, data);
  }
}
