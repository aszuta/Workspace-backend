import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_users', function (table) {
    table
      .integer('postId')
      .unsigned()
      .references('id')
      .inTable('post')
      .onDelete('CASCADE');
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('user')
      .onDelete('CASCADE');
    table.primary(['postId', 'userId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('post_users');
}
