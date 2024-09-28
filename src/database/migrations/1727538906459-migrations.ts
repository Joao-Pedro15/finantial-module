import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727538906459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'discounts',
            columns: [
                { name: 'id', type: 'uuid', isPrimary:true, default: 'gen_random_uuid()' },
                { name: 'discount_percentage', type: 'float' },
                { name: 'discount_value', type: 'float' },
                { name: 'first_installment', type: 'boolean' },
                { name: 'enabled', type: 'boolean', default:true }
            ]
        }))

        await queryRunner.createTable(new Table({
            name: 'contracts_discounts',
            columns: [
                { name: 'id', type: 'varchar', isPrimary: true },
                { name: 'contract_id', type: 'varchar', isPrimary: true },
                { name: 'discount_id', type: 'varchar', isPrimary: true },
            ]
        }), true)

        await queryRunner.createForeignKeys('contracts_discounts', [
            new TableForeignKey({
                columnNames: ['contract_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'contracts',
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['discount_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'discounts',
                onDelete: 'CASCADE'
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
