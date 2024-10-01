import { Contract } from "../../persistence/entities/contract.entity";
import { BlackFridayCampain } from "./campain/black-friday.campain";
import { CampainStrategy } from "./campain/campain-strategy";
import { ChristmasCampain } from "./campain/christmas.campain";
import { DefaultCampain } from "./campain/default.campain";
import { SumDiscountsUseCase } from "./sum-discounts.usecase";

export class CampainContextUseCase {

  constructor(
    private readonly contract:Contract
  ) {}

  setCampain(finantialPlan:CampainNames): CampainStrategy {
    const sumDiscounts = new SumDiscountsUseCase(this.contract.contractDiscounts)
    
    if(finantialPlan == 'blackFriday') {
      return new BlackFridayCampain(this.contract, sumDiscounts)
    }

    if(finantialPlan == 'christmas') {
      return new ChristmasCampain(this.contract, sumDiscounts)
    }

    return new DefaultCampain(this.contract, sumDiscounts)
  }
}

export type CampainNames = 'blackFriday' | 'default' | 'christmas'