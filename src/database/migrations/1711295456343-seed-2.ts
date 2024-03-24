import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed21711295456343 implements MigrationInterface {
  name = 'Seed21711295456343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_81bb16127710ef6b27a76d55900"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "isReserved"`);
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "serviceId"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "is_reserved" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" ADD "service_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_ddd03cb28bed3c395141ecc05b3" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP CONSTRAINT "FK_ddd03cb28bed3c395141ecc05b3"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "service_id"`);
    await queryRunner.query(
      `ALTER TABLE "schedules" DROP COLUMN "is_reserved"`,
    );
    await queryRunner.query(`ALTER TABLE "schedules" ADD "serviceId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD "isReserved" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "schedules" ADD CONSTRAINT "FK_81bb16127710ef6b27a76d55900" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
