import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionAccountsRelation21668738170923 implements MigrationInterface {
    name = 'TransactionAccountsRelation21668738170923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccount" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccount" integer`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "transactions_id_seq" OWNED BY "transactions"."id"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "id" SET DEFAULT nextval('"transactions_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "accountId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "accountId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "transactions_id_seq"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccount"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccount"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountId" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountId" integer`);
    }

}
