import { DataSource, Repository } from "typeorm";
import { Contract } from "../entities/contract.entity";

export class ContractRepository extends Repository<Contract> {

  constructor(dataSource: DataSource) {
    super(Contract, dataSource.createEntityManager())
  }

}