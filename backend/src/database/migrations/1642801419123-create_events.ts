import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createEvents1642801419123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "title",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "label",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "day",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "time",
            type: "time",
            isNullable: false,
          },
          {
            name: "city",
            type: "varchar"
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }
}
