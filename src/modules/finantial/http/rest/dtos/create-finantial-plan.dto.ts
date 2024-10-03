import { IsBoolean, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateFinantialPlanDto {
 
  @IsString()
  name: string

  @IsString()
  dueDateRule: string
  
  @IsNumber()
  contractValue: number

  @IsBoolean()
  enabled: boolean

  @IsNumber()
  year: number
}