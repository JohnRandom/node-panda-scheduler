exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('lessons', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name', 255).notNullable();
      table.text('description');
      table.integer('weekday').notNullable();
      table.time('time_starting').notNullable();
      table.time('time_ending').notNullable();
      table.boolean('is_cancelled').defaultTo(false);
      table.float('rating');
      table.uuid('teacher_id').notNullable().references('teachers.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('lessons')
  ]);
};
