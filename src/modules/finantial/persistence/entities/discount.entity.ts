import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { ContractDiscount } from "./contract-discount.entity";

@Entity()
export class Discount extends BaseEntity {

    @Column({ name: 'discount_percentage', nullable: true })
    discountPercentage: number

    @Column({ name: 'discount_value', nullable: true })
    value: number

    @Column({ name: 'first_installment' })
    firstInstallment: boolean

    @Column({ default: true })
    enabled: boolean

    @OneToMany(() => ContractDiscount, contractDiscount => contractDiscount.discount)
    contractDiscounts: ContractDiscount[]

}