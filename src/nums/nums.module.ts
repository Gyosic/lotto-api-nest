import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Num } from 'src/typeorm/entities/Num';
import { NumsController } from './controllers/nums/nums.controller';
import { NumsService } from './services/nums/nums.service';

@Module({
  imports: [TypeOrmModule.forFeature([Num]), HttpModule],
  controllers: [NumsController],
  providers: [NumsService],
})
export class NumsModule {}
