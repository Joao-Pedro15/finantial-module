import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import variables from './config/variables';
import { DbModule } from './database/database.module';
import { FinancialModule } from './modules/finantial/financial.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [variables]
    }),
    DbModule,
    FinancialModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
