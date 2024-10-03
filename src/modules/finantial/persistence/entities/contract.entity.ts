import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ContractStatusEnum } from "./enums/contract-status.enum";
import { BaseEntity } from "src/config/entity.base";
import { FinancialPlan } from "./financialPlan.entity";
import { ContractDiscount } from "./contract-discount.entity";
import { Entry } from "./entry.entity";

@Entity({ name: "contracts" })
export class Contract extends BaseEntity {


  @Column({ enum: ContractStatusEnum, default: ContractStatusEnum.OUT_FOR_SIGNATURE })
  status: string

  @Column()
  signDate: Date

  @Column()
  value: number

  @Column()
  qtdInstallments: number

  @Column()
  financialPlanId: number

  @ManyToOne(() => FinancialPlan, financialPlan => financialPlan.contracts)
  financialPlan: FinancialPlan

  @OneToMany(() => ContractDiscount, contractDiscount => contractDiscount.contract)
  contractDiscounts: ContractDiscount[]

  @OneToMany(() => Entry, entry => entry.contract, { nullable: true })
  entries?: Entry[]
} 