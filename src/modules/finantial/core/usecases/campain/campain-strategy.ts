import { Contract } from "src/modules/finantial/persistence/entities/contract.entity"
import { SumDiscountsUseCase } from "../sum-discounts.usecase"

export interface TValuesInstallment {
  adjusted: number
  discount: number | null
  value: number
}

export abstract class CampainStrategy {
  contract: Contract
  sumDiscounts: SumDiscountsUseCase
  abstract firstInstallment(): TValuesInstallment
  abstract restInstallments(): TValuesInstallment[]
}


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

export class DefaultCampain implements CampainStrategy {

  contract: Contract
  sumDiscounts: SumDiscountsUseCase

  constructor(contract: Contract, sumDiscounts: SumDiscountsUseCase) {
    this.contract = contract
    this.sumDiscounts = sumDiscounts
  }

  firstInstallment(): TValuesInstallment {
    const discount = this.sumDiscounts.sumFirstDiscounts(this.contract.value)
    return { adjusted: this.contract.value - discount, value: this.contract.value , discount}
  }
  
  restInstallments(): TValuesInstallment[] {
    const rest = this.contract.value - (200)
    const values = { adjusted: this.contract.value, discount: 200, value: rest }
    return new Array(12).fill(values)
  }
  
}
