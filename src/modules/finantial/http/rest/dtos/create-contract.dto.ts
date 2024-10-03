import { IsNumber, IsUUID } from "class-validator"

export class CreateContractDto {
  @IsNumber()
  qtdInstallments: number

  @IsNumber()
  financialPlanId: number
}