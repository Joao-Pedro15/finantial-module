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
