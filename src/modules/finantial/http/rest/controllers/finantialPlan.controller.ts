import { Body, Controller, Get, Post } from "@nestjs/common";
import { FinantialPlansService } from "src/modules/finantial/core/services/finantialPlans.service";
import { CreateFinantialPlanDto } from "../dtos/create-finantial-plan.dto";

@Controller('finantialPlan')
export class FinantialPlanController {

  constructor(private readonly finantialPlanService: FinantialPlansService) {}


  @Post()
  async create(@Body() data: CreateFinantialPlanDto) {
    return await this.finantialPlanService.create(data)
  }

  @Get()
  async find() {
    return await this.finantialPlanService.find()
  }

}