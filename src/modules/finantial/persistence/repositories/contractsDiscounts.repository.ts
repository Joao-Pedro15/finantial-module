import { DataSource, Repository } from "typeorm";
import { ContractDiscount } from "../entities/contract-discount.entity";

export class ContractsDiscountsRepository extends Repository<ContractDiscount> {

  constructor(dataSource: DataSource) {
    super(ContractDiscount, dataSource.createEntityManager())
  }

}