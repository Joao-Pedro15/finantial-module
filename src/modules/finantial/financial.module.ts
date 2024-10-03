import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialPlan } from './persistence/entities/financialPlan.entity';
import { Discount } from './persistence/entities/discount.entity';
import { DiscountsService } from './core/services/discounts.service';
import { DiscountsController } from './http/rest/controllers/discounts.controller';
import { Contract } from './persistence/entities/contract.entity';
import { ContractsController } from './http/rest/controllers/contracts.controller';
import { ContractsService } from './core/services/contracts.service';
import { Entry } from './persistence/entities/entry.entity';
import { EntriesService } from './core/services/entries.service';
import { FinancialPlanController } from './http/rest/controllers/financialPlan.controller';
import { FinancialPlansService } from './core/services/financialPlans.service';
import { ContractDiscount } from './persistence/entities/contract-discount.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialPlan, Discount, Contract, Entry, ContractDiscount])],
  controllers: [FinancialPlanController, DiscountsController, ContractsController],
  providers: [FinancialPlansService, DiscountsService, ContractsService, EntriesService],
})
export class FinancialModule {}
