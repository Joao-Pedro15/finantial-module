import { BaseEntity } from "src/config/entity.base";
import { Column, Entity, ManyToOne } from "typeorm";
import { EntryStatusEnum } from "./enums/entry-status.enum";
import { Contract } from "./contract.entity";

@Entity()
export class Entry extends BaseEntity {

  @Column({ name: 'contract_id' })
  contractId: string

  @Column()
  value: number

  @Column()
  discount: number

  @Column()
  adjusted: number

  @Column({ nullable: true })
  interest?: number

  @Column({ nullable: true })
  fine?: number


  @Column()
  installment: number

  @Column({ enum: EntryStatusEnum, default: EntryStatusEnum.PENDING })
  status: string

  @ManyToOne(() => Contract)
  contract: Contract

}