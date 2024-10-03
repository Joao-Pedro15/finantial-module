import { Injectable } from "@nestjs/common";
import { FinancialPlanRepository } from "../../persistence/repositories/financialPlan.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { FinancialPlan } from "../../persistence/entities/financialPlan.entity";
import { CreateFinantialPlanDto } from "../../http/rest/dtos/create-finantial-plan.dto";

@Injectable()
export class FinancialPlansService {
  constructor(
    @InjectRepository(FinancialPlan)
    private readonly financialPlanRepository: FinancialPlanRepository
  )  {}

  async find() {
    return this.financialPlanRepository.find({
      relations: {
        contracts: true
      }
    })
  }

  async findById(id: number) {
    return this.financialPlanRepository.findOneOrFail({ where: { id } })
  }

  async create(data: CreateFinantialPlanDto): Promise<void> {
    const entity = this.financialPlanRepository.create({
      dueDateRule: 'V5',
      enabled: data.enabled,
      name: data.name,
      year: data.year,
      contractValue: data.contractValue 
    }) 

    await this.financialPlanRepository.save(entity)
  }

}