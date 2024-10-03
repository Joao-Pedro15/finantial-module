import { Body, Controller, Get, Post } from "@nestjs/common";
import { FinancialPlansService } from "src/modules/finantial/core/services/financialPlans.service";
import { CreateFinantialPlanDto } from "../dtos/create-finantial-plan.dto";

@Controller('financialPlan')
export class FinancialPlanController {

  constructor(private readonly financialPlanService: FinancialPlansService) {}


  @Post()
  async create(@Body() data: CreateFinantialPlanDto) {
    return await this.financialPlanService.create(data)
  }

  @Get()
  async find() {
    return await this.financialPlanService.find()
  }

}