import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateRoleNameConstraint1683471591234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'roles',
      'role_name',
      new TableColumn({
        name: 'role_name',
        type: 'varchar',
        length: '255',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'roles',
      'role_name',
      new TableColumn({
        name: 'role_name',
        type: 'varchar',
        length: '255',
        isNullable: true,
      }),
    );
  }
}
