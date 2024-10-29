import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('workspace_members', function (table) {
    table
      .integer('workspace_id')
      .unsigned()
      .references('id')
      .inTable('workspace')
      .onDelete('CASCADE');
    table
      .string('user_email')
      .notNullable()
      .references('email')
      .inTable('user')
      .onDelete('CASCADE');
    table.primary(['workspace_id', 'user_email']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('workspace_members');
}
