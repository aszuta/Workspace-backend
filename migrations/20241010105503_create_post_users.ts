import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_users', function (table) {
    table
      .integer('post_id')
      .unsigned()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE');
    table
      .string('user_email')
      .notNullable()
      .references('email')
      .inTable('user')
      .onDelete('CASCADE');
    table.primary(['post_id', 'user_email']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post_users');
}
