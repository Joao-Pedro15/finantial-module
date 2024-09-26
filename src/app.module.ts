import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import variables from './config/variables';
import { DbModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [variables]
    }),
    DbModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
