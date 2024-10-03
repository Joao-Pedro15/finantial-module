import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post } from "@nestjs/common";
import { ContractsService } from "src/modules/finantial/core/services/contracts.service";
import { CreateContractDto } from "../dtos/create-contract.dto";
import { EntriesService } from "src/modules/finantial/core/services/entries.service";
import { CreateEntryDto } from "../dtos/create-entry.dto";
import { ContractStatusEnum } from "src/modules/finantial/persistence/entities/enums/contract-status.enum";

@Controller('contracts')
export class ContractsController {

  constructor(
    private readonly contractsService: ContractsService,
    private readonly entriesService: EntriesService
  ) {}

  @Post()
  async create(@Body() data: CreateContractDto) {
    return await this.contractsService.add(data)
  }

  @Post('/sign')
  async signContract(@Body() data: CreateEntryDto) {

    await this.contractsService.update(data.contractId, { 
      signDate: new Date(),
      status: ContractStatusEnum.SIGNED
    })
    return await this.entriesService.firstInstallment(data)
  }

  @Get()
  async find() {
    return await this.contractsService.find()
  }



  @Delete('/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.contractsService.delete(id)
  }

}