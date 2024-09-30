import { DataSource, Repository } from "typeorm";
import { Discount } from "../entities/discount.entity";

export class DiscountsRepository extends Repository<Discount> {
  constructor(dataSource: DataSource) {
    super(Discount, dataSource.createEntityManager())
  }
}