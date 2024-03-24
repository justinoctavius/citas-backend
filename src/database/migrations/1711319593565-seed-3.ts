import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed31711319593565 implements MigrationInterface {
    name = 'Seed31711319593565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passwordless" DROP CONSTRAINT "FK_98fb39c48f86b7d4cc9b370379f"`);
        await queryRunner.query(`ALTER TABLE "passwordless" RENAME COLUMN "user_id" TO "email"`);
        await queryRunner.query(`ALTER TABLE "passwordless" RENAME CONSTRAINT "UQ_98fb39c48f86b7d4cc9b370379f" TO "UQ_61208478fe3a3dad9977c43509b"`);
        await queryRunner.query(`ALTER TABLE "passwordless" DROP CONSTRAINT "UQ_61208478fe3a3dad9977c43509b"`);
        await queryRunner.query(`ALTER TABLE "passwordless" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "passwordless" ADD "email" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passwordless" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "passwordless" ADD "email" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "passwordless" ADD CONSTRAINT "UQ_61208478fe3a3dad9977c43509b" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "passwordless" RENAME CONSTRAINT "UQ_61208478fe3a3dad9977c43509b" TO "UQ_98fb39c48f86b7d4cc9b370379f"`);
        await queryRunner.query(`ALTER TABLE "passwordless" RENAME COLUMN "email" TO "user_id"`);
        await queryRunner.query(`ALTER TABLE "passwordless" ADD CONSTRAINT "FK_98fb39c48f86b7d4cc9b370379f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
