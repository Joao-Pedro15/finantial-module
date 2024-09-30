import { Injectable } from "@nestjs/common";
import { ContractRepository } from "../../persistence/repositories/contract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "../../persistence/entities/contract.entity";
import { CreateContractDto } from "../../http/rest/dtos/create-contract.dto";
import { FinantialPlanRepository } from "../../persistence/repositories/finantialPlan.repository";
import { FinantialPlan } from "../../persistence/entities/finantialPlan.entity";

@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: ContractRepository,
    @InjectRepository(FinantialPlan)
    private readonly finantialPlanRepository: FinantialPlanRepository
  ) {}

  async add(data: CreateContractDto) {
    const finantialPlan = await this.finantialPlanRepository.findOneByOrFail({ id: data.finantialPlanId })
    
    const contract = this.contractsRepository.create({
      qtdInstallments: data.qtdInstallments,
      value: finantialPlan.contractValue,
      finantialPlanId: data.finantialPlanId,
      signDate: new Date()
    })

    await this.contractsRepository.save(contract)
  }

  async find() {
    return await this.contractsRepository.find()
  }

}