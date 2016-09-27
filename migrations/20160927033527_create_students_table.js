exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('students', (table) => {
      table.uuid('id').primary();
      table.string('name', 255).notNullable();
    }),
    knex.schema.createTable('lesson_attendees', (table) => {
      table.uuid('lesson_id').notNullable();
      table.uuid('student_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());

      table.foreign('lesson_id').references('lessons.id');
      table.foreign('student_id').references('students.id');

      table.unique(['lesson_id', 'student_id']);
    })
  ]);
};

exports.down = function down(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('students'),
    knex.schema.dropTable('lesson_attendees')
  ]);
};
