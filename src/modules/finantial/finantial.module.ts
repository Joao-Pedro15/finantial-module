import { Module } from '@nestjs/common';
import { FinantialPlansService } from './core/services/finantialPlans.service';
import { FinantialPlanController } from './http/rest/controllers/finantialPlan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinantialPlan } from './persistence/entities/finantialPlan.entity';
import { Discount } from './persistence/entities/discount.entity';
import { DiscountsService } from './core/services/discounts.service';
import { DiscountsController } from './http/rest/controllers/discounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FinantialPlan, Discount])],
  controllers: [FinantialPlanController, DiscountsController],
  providers: [FinantialPlansService, DiscountsService],
})
export class FinantialModule {}
