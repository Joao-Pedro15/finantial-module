import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727874395224 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'financialPlans',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'name', type: 'varchar' },
                { name: 'dueDateRule', type: 'varchar' },
                { name: 'contractValue', type: 'float' },
                { name: 'enabled', type: 'boolean', default: true },
                { name: 'year', type: 'int', default: new Date().getFullYear() },
            ]   
        }))

        await queryRunner.createTable(new Table({
            name: 'contracts',
            columns: [
                { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                { name: 'signDate', type: 'date' },
                { name: 'value', type: 'float' },
                { name: 'qtdInstallments', type: 'int' },
                { name: 'financialPlanId', type: 'int' },
                { 
                    name: 'status', 
                    type: 'enum',
                    enum: ["CANCELLED", "OUT_FOR_SIGNATURE", "SIGNED" ]
                }
            ]
        }))

        await queryRunner.createForeignKey('contracts', new TableForeignKey({
            columnNames: ['financialPlanId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'financialPlans',
            onDelete: 'CASCADE'
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
