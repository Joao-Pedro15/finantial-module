import { Column, Entity, OneToMany } from "typeorm";
import { ContractDiscount } from "./contract-discount.entity";
import { BaseEntity } from "src/config/entity.base";

@Entity({ name: "discounts" })
export class Discount extends BaseEntity {

    @Column({ nullable: true })
    discountPercentage: number

    @Column({ nullable: true })
    value: number

    @Column()
    firstInstallment: boolean

    @Column({ default: true })
    enabled: boolean

    @OneToMany(() => ContractDiscount, contractDiscount => contractDiscount.discount)
    contractDiscounts: ContractDiscount[]

}