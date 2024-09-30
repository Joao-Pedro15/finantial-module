import { DataSource, Repository } from "typeorm";
import { Entry } from "../entities/entry.entity";

export class EntriesRepository extends Repository<Entry> {

  constructor(dataSource: DataSource) {
    super(Entry, dataSource.createEntityManager())
  }
}