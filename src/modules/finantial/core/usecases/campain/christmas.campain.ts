import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"
import { CampainStrategy, TValuesInstallment } from "./campain-strategy"

export class ChristmasCampain implements CampainStrategy {
  private readonly initialValue = 100
  private readonly contractValue:number
  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract: Contract, sumDiscounts: SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
    this.contractValue = contract.value / 12
  }

  firstInstallment(): TValuesInstallment {
    const discount = this.sumDiscounts.sumFirstDiscounts(this.contractValue) + this.initialValue
    return { adjusted: this.contractValue - discount, value: this.contractValue , discount}
  }
  
  restInstallments(): TValuesInstallment[] {
    const rest = this.contractValue - (200)
    const values = { adjusted: this.contractValue, discount: 200, value: rest }
    return new Array(5).fill(values)
  }
}