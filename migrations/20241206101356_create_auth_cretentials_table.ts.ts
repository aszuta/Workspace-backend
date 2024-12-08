import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('auth_credentials', function (table) {
    table
      .integer('id')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table.string('password', 255).notNullable();
    table.string('refreshToken');
    table.primary(['id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('auth_credentials');
}
