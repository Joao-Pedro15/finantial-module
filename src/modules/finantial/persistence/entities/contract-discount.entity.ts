import {  Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Contract } from "./contract.entity";
import { Discount } from "./discount.entity";
import { BaseEntity } from "src/config/entity.base";

@Entity({ name: 'contractsDiscounts' })
export class ContractDiscount extends BaseEntity {

    @Column()
    contractId: number

    @Column()
    discountId: number
    
    @ManyToOne(() => Contract, contract => contract.contractDiscounts)
    @JoinColumn({ name: 'contractId', referencedColumnName: 'id' })
    contract: Contract


    @ManyToOne(() => Discount, discount => discount.contractDiscounts)
    @JoinColumn({ name: 'discountId', referencedColumnName: 'id' })
    discount: Discount
}