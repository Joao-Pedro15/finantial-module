import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountsRepository } from "../../persistence/repositories/discounts.repository";
import { Discount } from "../../persistence/entities/discount.entity";
import { CreateDiscountDto } from "../../http/rest/dtos/create-discount.dto";
import { Contract } from "../../persistence/entities/contract.entity";
import { ContractRepository } from "../../persistence/repositories/contract.repository";
import { ContractDiscount } from "../../persistence/entities/contract-discount.entity";
import { ContractsDiscountsRepository } from "../../persistence/repositories/contractsDiscounts.repository";
import { CreateContractDiscountDto } from "../../http/rest/dtos/create-contract-discount.dto";

@Injectable()
export class DiscountsService {
  constructor(
    @InjectRepository(Discount)
    private readonly discountsRepository: DiscountsRepository,
    @InjectRepository(Contract)
    private readonly contractsRepository: ContractRepository,
    @InjectRepository(ContractDiscount)
    private readonly contractsDiscountsRepository: ContractsDiscountsRepository
  ) {}

  async add(data: CreateDiscountDto) {
    if(!data.discountPercentage && !data.value) {
      throw new HttpException('passing discountPercentage OR value', HttpStatus.BAD_REQUEST)
    }
    const discount = this.discountsRepository.create({
      discountPercentage: data.discountPercentage,
      enabled: data.enabled,
      value: data.value,
      firstInstallment: data.firstInstallment
    })
    await this.discountsRepository.save(discount)
  }

  async addInContract(data:CreateContractDiscountDto) {

    await Promise.all([
      this.discountsRepository.findOneByOrFail({ id: data.discountId }),
      this.contractsRepository.findOneByOrFail({ id: data.contractId })
    ])

    await this.contractsDiscountsRepository.save({
      contractId: data.contractId,
      discountId: data.discountId,
    })

  }

  async find() {
    return await this.discountsRepository.find()
  }

}