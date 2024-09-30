import { IsBoolean, IsNumber, IsOptional } from "class-validator"

export class CreateDiscountDto {
  @IsNumber()
  @IsOptional()
  discountPercentage?: number

  @IsBoolean()
  enabled: boolean

  @IsNumber()
  @IsOptional()
  value: number
  
  @IsBoolean()
  firstInstallment:boolean

}