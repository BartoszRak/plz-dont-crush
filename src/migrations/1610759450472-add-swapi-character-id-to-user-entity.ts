import {MigrationInterface, QueryRunner} from "typeorm";

export class addSwapiCharacterIdToUserEntity1610759450472 implements MigrationInterface {
    name = 'addSwapiCharacterIdToUserEntity1610759450472'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "swapiCharacterId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "swapiCharacterId"`);
    }

}
