import { IsNumber, IsUUID } from "class-validator";

export class CreateEntryDto {

  @IsNumber()
  installment: number

  @IsUUID()
  contractId: string
}