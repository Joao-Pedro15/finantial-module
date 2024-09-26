import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrations1727364708143 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(new Table({
            name: 'finantial_plans',
            columns: [
                { name: 'id', type: 'uuid', isPrimary:true, default: 'gen_random_uuid()' },
                { name: 'name', type: 'varchar' },
                { name: 'due_date', type: 'date' },
                { name: 'contract_value', type: 'float' },
                { name: 'enabled', type: 'boolean', default: true },
                { name: 'year', type: 'int', default: new Date().getFullYear() },
            ]   
        }))

        await queryRunner.createTable(new Table({
            name: 'contracts',
            columns: [
                { name: 'id', type: 'uuid', isPrimary:true, default: 'gen_random_uuid()' },
                { name: 'sign_date', type: 'date' },
                { name: 'value', type: 'float' },
                { name: 'qtd_installments', type: 'int' },
                { name: 'finantial_plan_id', type: 'varchar' },
                { 
                    name: 'status', 
                    type: 'enum',
                    enum: ["CANCELLED", "OUT_FOR_SIGNATURE", "SIGNED" ] ,
                    default: "CANCELLED"
                }
            ]
        }))

        await queryRunner.createForeignKey('contracts', new TableForeignKey({
            columnNames: ['finantial_plan_id'],
            referencedColumnNames: ['finantial_plan_id'],
            referencedTableName: 'finantial_plans',
            onDelete: 'CASCADE'
        }))

    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
