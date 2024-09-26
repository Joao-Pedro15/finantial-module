import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './typeorm-migrations'


@Module({
  imports: [
    TypeOrmModule.forRoot(datasourceOptions)
  ]  
  })
export class DbModule {}
