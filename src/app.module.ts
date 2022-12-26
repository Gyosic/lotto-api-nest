import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Num } from './typeorm/entities/Num';
import { NumsModule } from './nums/nums.module';
import { MyNum } from './typeorm/entities/MyNum';
import { MyNumsModule } from './my-nums/my-nums.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '#gyosic1234',
      database: process.env.DATABASE_NAME || 'lotto',
      entities: [Num, MyNum],
      synchronize: true,
    }),
    NumsModule,
    MyNumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
