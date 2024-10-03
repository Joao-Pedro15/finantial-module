import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727876435322 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'discounts',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'discountPercentage', type: 'float' },
                { name: 'discountValue', type: 'float' },
                { name: 'firstInstallment', type: 'boolean' },
                { name: 'enabled', type: 'boolean', default:true }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'contractsDiscounts',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'contractId', type: 'int', isPrimary: true },
                { name: 'discountId', type: 'int', isPrimary: true },
            ]
        }), true)

        await queryRunner.createForeignKeys('contractsDiscounts', [
            new TableForeignKey({
                columnNames: ['contractId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contracts',
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['discountId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'discounts',
                onDelete: 'CASCADE'
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
