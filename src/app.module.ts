import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Num } from './typeorm/entities/Num';
import { NumsModule } from './nums/nums.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '#gyosic1234',
      database: process.env.DATABASE_NAME || 'lotto',
      entities: [Num],
      synchronize: true,
    }),
    NumsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
