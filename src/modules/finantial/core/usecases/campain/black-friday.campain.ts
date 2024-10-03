import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"
import { CampainStrategy, TValuesInstallment } from "./campain-strategy"

export class BlackFridayCampain implements CampainStrategy {
  private readonly initalValue = 200
  private readonly contractValue:number

  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract:Contract, sumDiscounts:SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
    this.contractValue = contract.value / 12
  }
 
  restInstallments(): TValuesInstallment[] {
    const rest = this.contractValue - (200)
    const values = { adjusted: this.contractValue, discount: 200, value: rest }
    return new Array(3).fill(values)
  }

  firstInstallment(): TValuesInstallment {
    return { 
      adjusted: this.initalValue, 
      discount: this.contractValue - this.initalValue,
      value: this.contractValue
    }
  }
}