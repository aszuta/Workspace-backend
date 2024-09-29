import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('workspace', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table
      .integer('owner')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('workspace');
}
