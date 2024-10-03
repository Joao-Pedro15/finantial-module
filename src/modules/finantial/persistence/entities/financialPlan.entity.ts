import { BaseEntity } from "src/config/entity.base";
import { Column, Entity, OneToMany } from "typeorm";
import { Contract } from "./contract.entity";

@Entity({ name:"financialPlans" })
export class FinancialPlan extends BaseEntity {

  @Column()
  name:string
  
  @Column()
  dueDateRule: string

  @Column()
  contractValue:number

  @Column({ default: true })
  enabled: boolean

  @Column({ default: new Date().getFullYear() })
  year: number

  @OneToMany(() => Contract, contract => contract.financialPlan)
  contracts: Contract[]

}
