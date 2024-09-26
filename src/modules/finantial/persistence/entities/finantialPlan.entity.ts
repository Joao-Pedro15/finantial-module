import { BaseEntity } from "src/config/entity.base";
import { Column, Entity, OneToMany } from "typeorm";
import { Contract } from "./contract.entity";

@Entity()
export class FinantialPlan extends BaseEntity {

  @Column()
  name:string
  
  @Column({ name: "due_date" })
  dueDate: Date

  @Column({ name: "contract_value" })
  contractValue:number

  @Column({ default: true })
  enabled: boolean

  @Column({ default: new Date().getFullYear() })
  year: number

  @OneToMany(() => Contract, contract => contract.finantialPlan)
  contracts: Contract[]

}
