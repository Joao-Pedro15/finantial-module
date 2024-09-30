import { IsNumber, IsUUID } from "class-validator"

export class CreateContractDto {
  @IsNumber()
  qtdInstallments: number

  @IsUUID()
  finantialPlanId: string
}