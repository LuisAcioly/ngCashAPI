import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionAccountRelation1668619324601 implements MigrationInterface {
    name = 'TransactionAccountRelation1668619324601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_451cbcc1a726df852a6f2a905a9" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_cf148e1a0fab8b3f21f031d1f9b" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_cf148e1a0fab8b3f21f031d1f9b"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_451cbcc1a726df852a6f2a905a9"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountId"`);
    }

}
