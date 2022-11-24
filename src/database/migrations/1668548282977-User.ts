import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class User1668548282977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "accounts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "balance",
                        type: "money",
                    },
                ],
            }),
            true,
        );
        
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("accounts");
    }

}
