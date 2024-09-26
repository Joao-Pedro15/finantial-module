import { Module } from '@nestjs/common';
import { FinantialPlansService } from './core/services/finantialPlans.service';
import { FinantialPlanController } from './http/rest/controllers/finantialPlan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinantialPlan } from './persistence/entities/finantialPlan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FinantialPlan])],
  controllers: [FinantialPlanController],
  providers: [FinantialPlansService],
})
export class FinantialModule {}
