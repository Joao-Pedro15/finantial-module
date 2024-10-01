import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"
import { TValuesInstallment } from "./campain-strategy"

export class BlackFridayCampain implements CampainStrategy {
  private readonly initalValue = 200

  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract:Contract, sumDiscounts:SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
  }
 
  restInstallments(): TValuesInstallment[] {
    const rest = this.contract.value - (200)
    const values = { adjusted: this.contract.value, discount: 200, value: rest }
    return new Array(3).fill(values)
  }

  firstInstallment(): TValuesInstallment {
    return { 
      adjusted: this.initalValue, 
      discount: this.contract.value - this.initalValue,
      value: this.contract.value
    }
  }
}