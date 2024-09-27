import { Injectable } from "@nestjs/common";
import { FinantialPlanRepository } from "../../persistence/repositories/finantialPlan.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FinantialPlan } from "../../persistence/entities/finantialPlan.entity";
import { CreateFinantialPlanDto } from "../../http/rest/dtos/create-finantial-plan.dto";

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

  async create(data: CreateFinantialPlanDto): Promise<void> {
    const entity = this.finantialPlanRepository.create({
      dueDate: new Date(data.dueDate),
      enabled: data.enabled,
      name: data.name,
      year: data.year,
      contractValue: data.contractValue 
    }) 

    await this.finantialPlanRepository.save(entity)
  }

}