import { Injectable } from "@nestjs/common";
import { ContractRepository } from "../../persistence/repositories/contract.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "../../persistence/entities/contract.entity";
import { CreateContractDto } from "../../http/rest/dtos/create-contract.dto";
import { FinancialPlanRepository } from "../../persistence/repositories/financialPlan.repository";
import { FinancialPlan } from "../../persistence/entities/financialPlan.entity";

@Injectable()
export class ContractsService {

  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: ContractRepository,
    @InjectRepository(FinancialPlan)
    private readonly financialPlanRepository: FinancialPlanRepository
  ) {}

  async add(data: CreateContractDto) {
    const finantialPlan = await this.financialPlanRepository.findOneByOrFail({ id: data.financialPlanId })
    
    const contract = this.contractsRepository.create({
      qtdInstallments: data.qtdInstallments,
      value: finantialPlan.contractValue,
      financialPlanId: data.financialPlanId,
      signDate: new Date(),
    })

    await this.contractsRepository.save(contract)
  }

  async find() {
    return await this.contractsRepository.find({
      relations: { financialPlan: true, contractDiscounts: true }
    })
  }

  async update(id: number, data: Partial<Contract>) {
    
    await this.contractsRepository.findOneByOrFail({ id })
    await this.contractsRepository.update(id, data)
    return
  } 

  async delete(id: number) {
    await this.contractsRepository.delete({ id })
  }

}