import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727876584425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "entries",
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'contractId', type: 'int' },
                { name: 'value', type: 'float' },
                { name: 'discount', type: 'float' },
                { name: 'adjusted', type: 'float' },
                { name: 'interest', type: 'float', isNullable: true },
                { name: 'fine', type: 'float', isNullable: true },
                { name: 'installmentNumber', type: 'int' },
                {
                    name: 'status',
                    type:'enum',
                    enum: ["CANCELLED", "PENDING", "SETTLED"],
                }
            ]
        }))

        await queryRunner.createForeignKey("entries", new TableForeignKey({
            columnNames: ['contractId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'contracts',
            onDelete: 'CASCADE' 
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
