import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('workspace_users', function (table) {
    table
      .integer('workspaceId')
      .unsigned()
      .references('id')
      .inTable('workspace')
      .onDelete('CASCADE');
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table.primary(['workspaceId', 'userId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('workspace_users');
}
