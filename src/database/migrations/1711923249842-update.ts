import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1711923249842 implements MigrationInterface {
    name = 'Update1711923249842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "services" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone`);
        await queryRunner.query(`ALTER TABLE "services" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "created_at"`);
    }

}
