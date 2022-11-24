import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Transactions1668557039303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "value",
                        type: "int",
                    },
                    {
                        name: "created_At",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            }),
            true,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }

}
