import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"
import { CampainStrategy, TValuesInstallment } from "./campain-strategy"

export class ChristmasCampain implements CampainStrategy {
  private readonly initialValue = 100
  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract: Contract, sumDiscounts: SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
  }

  firstInstallment(): TValuesInstallment {
    const discount = this.sumDiscounts.sumFirstDiscounts(this.contract.value) + this.initialValue
    return { adjusted: this.contract.value - discount, value: this.contract.value , discount}
  }
  
  restInstallments(): TValuesInstallment[] {
    const rest = this.contract.value - (200)
    const values = { adjusted: this.contract.value, discount: 200, value: rest }
    return new Array(5).fill(values)
  }
}