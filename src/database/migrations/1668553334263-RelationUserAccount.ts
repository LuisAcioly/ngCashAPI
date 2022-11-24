import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationUserAccount1668553334263 implements MigrationInterface {
    name = 'RelationUserAccount1668553334263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "accountId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_42bba679e348de51a699fb0a803" UNIQUE ("accountId")`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "users_id_seq" OWNED BY "users"."id"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" SET DEFAULT nextval('"users_id_seq"')`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "accounts_id_seq" OWNED BY "accounts"."id"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT nextval('"accounts_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "accounts_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "users_id_seq"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountId"`);
    }

}
