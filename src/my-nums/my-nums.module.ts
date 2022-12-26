import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyNum } from 'src/typeorm/entities/MyNum';
import { MyNumsController } from './controllers/my-nums/my-nums.controller';
import { MyNumsService } from './services/my-nums/my-nums.service';

@Module({
  imports: [TypeOrmModule.forFeature([MyNum])],
  controllers: [MyNumsController],
  providers: [MyNumsService],
})
export class MyNumsModule {}
