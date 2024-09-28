import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ContractStatusEnum } from "./enums/contract-status.enum";
import { BaseEntity } from "src/config/entity.base";
import { FinantialPlan } from "./finantialPlan.entity";
import { ContractDiscount } from "./contract-discount.entity";

@Entity()
export class Contract extends BaseEntity {


  @Column({ enum: ContractStatusEnum, default: ContractStatusEnum.OUT_FOR_SIGNATURE })
  status: string

  @Column({ name: "sign_date" })
  signDate: Date

  @Column({ name: "value" })
  value: number

  @Column({ name: "qtd_installments" })
  qtdInstallments: number

  @Column({ name: 'finantial_plan_id' })
  finantialPlanId: string

  @ManyToOne(() => FinantialPlan)
  finantialPlan: FinantialPlan

  @OneToMany(() => ContractDiscount, contractDiscount => contractDiscount.contract)
  contractDiscounts: ContractDiscount[]
} 