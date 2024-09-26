import { DataSource, Repository } from "typeorm";
import { FinantialPlan } from "../entities/finantialPlan.entity";
import { Injectable } from "@nestjs/common";
@Injectable()
export class FinantialPlanRepository extends Repository<FinantialPlan> {
  constructor(dataSource:DataSource) {
    super(FinantialPlan, dataSource.createEntityManager())
  }
}
