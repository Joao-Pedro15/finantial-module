import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Contract } from "./contract.entity";
import { Discount } from "./discount.entity";

@Entity()
export class ContractDiscount extends BaseEntity {

    @Column({ name: 'contract_id' })
    contractId: string

    @Column({ name: 'discount_id' })
    discountId: string
    
    @ManyToOne(() => Contract, contract => contract.contractDiscounts)
    @JoinColumn({ name: 'contract_id', referencedColumnName: 'id' })
    contract: Contract


    @ManyToOne(() => Discount, discount => discount.contractDiscounts)
    @JoinColumn({ name: 'discount_id', referencedColumnName: 'id' })
    discount: Discount
}