import { Injectable } from "@nestjs/common";
import { FinantialPlanRepository } from "../../persistence/repositories/finantialPlan.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FinantialPlan } from "../../persistence/entities/finantialPlan.entity";

@Injectable()
export class FinantialPlansService {
  constructor(
    @InjectRepository(FinantialPlan)
    private readonly finantialPlanRepository: FinantialPlanRepository
  )  {}

  async find() {
    return this.finantialPlanRepository.find()
  }

  async findById(id: string) {
    return this.finantialPlanRepository.findOneOrFail({ where: { id } })
  }

}