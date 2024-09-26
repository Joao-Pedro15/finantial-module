import { Controller, Get } from "@nestjs/common";
import { FinantialPlansService } from "src/modules/finantial/core/services/finantialPlans.service";

@Controller('finantialPlan')
export class FinantialPlanController {

  constructor(private readonly finantialPlanService: FinantialPlansService) {}

  @Get()
  async find() {
    return await this.finantialPlanService.find()
  }

}