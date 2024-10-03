import { IsNumber, IsUUID } from "class-validator";

export class CreateEntryDto {

  @IsNumber()
  installment: number

  @IsNumber()
  contractId: number
}