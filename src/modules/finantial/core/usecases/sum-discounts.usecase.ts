import { Contract } from "../../persistence/entities/contract.entity";
import { Discount } from "../../persistence/entities/discount.entity";

export class SumDiscountsUseCase {

  constructor(
    private readonly contractDiscounts: typeof Contract.prototype.contractDiscounts
  ) {}


  sumFirstDiscounts(value:number) {
    return this.contractDiscounts
    .filter(contract => !!contract.discount.firstInstallment)
    .reduce((prev, next) => prev += this.valueOrPercentage(next.discount, value), 0)
  }


  private valueOrPercentage(discount:Discount, value:number) {
    if(!!discount.value) return discount.value
    return value * (discount.discountPercentage / 100)

  }

}