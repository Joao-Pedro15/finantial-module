import { Injectable } from "@nestjs/common";
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
    const contract = await this.contractsRepository.findOneByOrFail({ id: data.contractId })
    const campain = new CampainContextUseCase(contract)
    const generate = campain.setCampain(contract.finantialPlan.name as CampainNames)
    const values = generate.firstInstallment()

    const entry = this.entriesRepository.create({
      adjusted:  values.adjusted,
      value: values.value,
      discount: values.discount,
      contractId: data.contractId,
      installment: data.installment,
      status: EntryStatusEnum.PENDING,
      fine: null,
      interest: null,
    })

    const rest = generate.restInstallments()
    .map((v, i) => this.entriesRepository.create({
        adjusted:  v.adjusted,
        value: v.value,
        discount: v.discount,
        contractId: data.contractId,
        installment: i++,
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