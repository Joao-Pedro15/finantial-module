import { Repository } from "typeorm";
import { Contract } from "../entities/contract.entity";

export class ContractRepository extends Repository<Contract> {}