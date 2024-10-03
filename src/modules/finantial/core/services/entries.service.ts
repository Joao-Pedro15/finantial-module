import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Entry } from "../../persistence/entities/entry.entity";
import { EntriesRepository } from "../../persistence/repositories/entries.repository";
import { CreateEntryDto } from "../../http/rest/dtos/create-entry.dto";
import { EntryStatusEnum } from "../../persistence/entities/enums/entry-status.enum";
import { Contract } from "../../persistence/entities/contract.entity";
import { ContractRepository } from "../../persistence/repositories/contract.repository";
import { CampainContextUseCase, CampainNames } from "../usecases/campain-context.usecase";

@Injectable()
export class EntriesService {

  constructor(
    @InjectRepository(Entry)
    private readonly entriesRepository: EntriesRepository,
    @InjectRepository(Contract)
    private readonly contractsRepository: ContractRepository
  ) {}

  async firstInstallment(data: CreateEntryDto) {
    const contract = await this.contractsRepository.find({
      where: { id: data.contractId },
      relations: {
        financialPlan: true
      }
    })
    if(!contract.length) throw new HttpException(`not found contract by id ${data.contractId}`, HttpStatus.BAD_REQUEST)
    const campain = new CampainContextUseCase(contract[0])
    const generate = campain.setCampain(contract[0].financialPlan.name as CampainNames)
    const values = generate.firstInstallment()

    const entry = this.entriesRepository.create({
      adjusted:  values.adjusted,
      value: values.value,
      discount: values.discount,
      contractId: data.contractId,
      installmentNumber: data.installment,
      status: EntryStatusEnum.PENDING,
      fine: null,
      interest: null
    })

    const rest = generate.restInstallments()
    .map((v, i) => this.entriesRepository.create({
        adjusted:  v.adjusted,
        value: v.value,
        discount: v.discount,
        contractId: data.contractId,
        installmentNumber: i += 2,
        status: EntryStatusEnum.PENDING,
        fine: null,
        interest: null,
      
    }))

    await Promise.all([
      this.entriesRepository.save(entry),
      this.entriesRepository.insert(rest)
    ])    
  }


}