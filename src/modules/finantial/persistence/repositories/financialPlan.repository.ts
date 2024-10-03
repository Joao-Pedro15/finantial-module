import { DataSource, Repository } from "typeorm";
import { FinancialPlan } from "../entities/financialPlan.entity";
import { Injectable } from "@nestjs/common";
@Injectable()
export class FinancialPlanRepository extends Repository<FinancialPlan> {
  constructor(dataSource:DataSource) {
    super(FinancialPlan, dataSource.createEntityManager())
  }
}
