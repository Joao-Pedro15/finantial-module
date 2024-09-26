import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import variables from './config/variables';
import { DbModule } from './database/database.module';
import { FinantialModule } from './modules/finantial/finantial.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [variables]
    }),
    DbModule,
    FinantialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
