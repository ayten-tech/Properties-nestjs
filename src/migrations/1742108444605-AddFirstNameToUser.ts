import { MigrationInterface, QueryRunner } from "typeorm";
//this migration adds coloumns firstname, lastname, email, avatarurl,createdAt since i encountered errors when i tried to send request with these coloumns
//as they were not in the table , so i added migration file , turned synchronize false during migration
// added defalult values , after adding migration , i successfully run the migration
export class AddFirstNameToUser1742108444605 implements MigrationInterface {
    name = 'AddFirstNameToUser1742108444605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL DEFAULT 'unknown@example.com'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatarUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatarUrl"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
    }

}
