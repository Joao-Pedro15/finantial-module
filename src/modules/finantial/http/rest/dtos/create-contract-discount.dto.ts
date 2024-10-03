import { IsNumber } from "class-validator"

export class CreateContractDiscountDto {

  @IsNumber()
  discountId: number

  @IsNumber()
  contractId: number

}