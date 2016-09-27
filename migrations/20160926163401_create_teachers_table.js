exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'),
    knex.schema.createTable('teachers', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('teachers')
  ]);
};
