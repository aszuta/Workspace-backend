import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post', function (table) {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table
      .integer('createdBy')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table
      .dateTime('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .integer('workspaceId')
      .unsigned()
      .references('id')
      .inTable('workspace')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post');
}
