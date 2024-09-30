import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727707015958 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "entries",
            columns: [
                { name: 'id', type: 'uuid', isPrimary:true, default: 'gen_random_uuid()' },
                { name: 'contract_id', type: 'uuid' },
                { name: 'value', type: 'float' },
                { name: 'discount', type: 'float' },
                { name: 'adjusted', type: 'float' },
                { name: 'interest', type: 'float', isNullable: true },
                { name: 'fine', type: 'float', isNullable: true },
                { name: 'installment', type: 'int' },
                {
                    name: 'status',
                    type:'enum',
                    enum: ["CANCELLED", "PENDING", "SETTLED"],
                    default: ["PENDING"]
                }
            ]
        }))

        await queryRunner.createForeignKey("entries", new TableForeignKey({
            columnNames: ['contract_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contracts',
            onDelete: 'CASCADE' 
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
