import { IsBoolean, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateFinantialPlanDto {
 
  @IsString()
  name: string

  @IsDateString()
  dueDate: string
  
  @IsNumber()
  contractValue: number

  @IsBoolean()
  enabled: boolean

  @IsNumber()
  year: number
}