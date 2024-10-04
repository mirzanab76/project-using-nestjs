import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRolesAndUsersTable1633012345678 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "roles",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "role_name",
                    type: "varchar",
                    isUnique: true
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nama",
                    type: "varchar"
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar"
                },
                {
                    name: "alamat",
                    type: "varchar"
                },
                {
                    name: "role_id",
                    type: "int"
                }
            ]
        }), true);

        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("role_id") !== -1);
        await queryRunner.dropForeignKey("users", foreignKey);
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("roles");
    }
}