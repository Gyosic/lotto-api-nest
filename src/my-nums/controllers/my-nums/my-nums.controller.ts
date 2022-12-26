import { Body, Controller, Post } from '@nestjs/common';
import { CreateMyNumDto } from 'src/my-nums/dtos/CreateMyNum.dto';
import { MyNumsService } from 'src/my-nums/services/my-nums/my-nums.service';

@Controller('my-nums')
export class MyNumsController {
  constructor(private myNumService: MyNumsService) {}
  @Post()
  async createMynum(@Body() createMyNumDetails: CreateMyNumDto) {
    return this.myNumService.createMyNum(createMyNumDetails);
  }
}
