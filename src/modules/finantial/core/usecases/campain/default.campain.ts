import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { CampainStrategy, TValuesInstallment } from "./campain-strategy"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"

export class DefaultCampain implements CampainStrategy {
  private readonly contractValue: number

  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract: Contract, sumDiscounts: SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
    this.contractValue = contract.value / 12
  }

  firstInstallment(): TValuesInstallment {
    const discount = this.sumDiscounts.sumFirstDiscounts(this.contractValue)
    return { adjusted: this.contractValue - discount, value: this.contractValue , discount}
  }
  
  restInstallments(): TValuesInstallment[] {
    const rest = this.contractValue - (200)
    const values = { adjusted: this.contractValue, discount: 200, value: rest }
    return new Array(12).fill(values)
  }
  
}