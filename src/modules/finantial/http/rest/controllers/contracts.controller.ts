import { Body, Controller, Get, Post } from "@nestjs/common";
import { ContractsService } from "src/modules/finantial/core/services/contracts.service";
import { CreateContractDto } from "../dtos/create-contract.dto";

@Controller('contracts')
export class ContractsController {

  constructor(
    private readonly contractsService: ContractsService
  ) {}

  @Post()
  async create(@Body() data: CreateContractDto) {
    return await this.contractsService.add(data)
  }

  @Get()
  async find() {
    return await this.contractsService.find()
  }

}