import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateMyNumDto } from 'src/my-nums/dtos/CreateMyNum.dto';
import { PickedNumsQuery } from 'src/my-nums/dtos/PickedNum.dto';
import { MyNumsService } from 'src/my-nums/services/my-nums/my-nums.service';

@Controller('my-nums')
export class MyNumsController {
  constructor(private myNumService: MyNumsService) {}
  @Get()
  async getPickedNums(@Query() query: PickedNumsQuery) {
    return this.myNumService.findPickedNums(query);
  }

  @Post()
  async createMynum(@Body() createMyNumDetails: CreateMyNumDto) {
    return this.myNumService.createMyNum(createMyNumDetails);
  }
}
