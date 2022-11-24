import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UniqueUsername21668652321638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "users",
            "username",
            new TableColumn({
                name: "username",
                type: "varchar",
                isUnique: true,
                isNullable: false,
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
