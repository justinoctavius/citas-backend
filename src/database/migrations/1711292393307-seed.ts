import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1711292393307 implements MigrationInterface {
    name = 'Seed1711292393307'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "passwordless" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "otp" character varying(6) NOT NULL, "expire_at" TIMESTAMP NOT NULL, "expire_in" integer NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "UQ_98fb39c48f86b7d4cc9b370379f" UNIQUE ("user_id"), CONSTRAINT "REL_98fb39c48f86b7d4cc9b370379" UNIQUE ("user_id"), CONSTRAINT "PK_ff6a46bb9feae362aa20b966923" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reserves" ("id" uuid NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "schedule_id" uuid, "service_id" uuid, "user_id" uuid, CONSTRAINT "REL_6b6a75f7103a4e0888621ddc98" UNIQUE ("schedule_id"), CONSTRAINT "PK_e38489955a3c1a3880737f466ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" uuid NOT NULL, "from" TIMESTAMP NOT NULL, "to" TIMESTAMP NOT NULL, "isReserved" boolean NOT NULL, "serviceId" uuid, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "services" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying, "emoji" character varying NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_ba2d347a3168a296416c6c5ccb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" uuid NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "passwordless" ADD CONSTRAINT "FK_98fb39c48f86b7d4cc9b370379f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_6b6a75f7103a4e0888621ddc986" FOREIGN KEY ("schedule_id") REFERENCES "schedules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_3cb8079120128de5d9c2df24835" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reserves" ADD CONSTRAINT "FK_55dff1b46f571331b36bae5f119" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_81bb16127710ef6b27a76d55900" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_421b94f0ef1cdb407654e67c59e" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_421b94f0ef1cdb407654e67c59e"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_81bb16127710ef6b27a76d55900"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_55dff1b46f571331b36bae5f119"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_3cb8079120128de5d9c2df24835"`);
        await queryRunner.query(`ALTER TABLE "reserves" DROP CONSTRAINT "FK_6b6a75f7103a4e0888621ddc986"`);
        await queryRunner.query(`ALTER TABLE "passwordless" DROP CONSTRAINT "FK_98fb39c48f86b7d4cc9b370379f"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "reserves"`);
        await queryRunner.query(`DROP TABLE "passwordless"`);
    }

}
