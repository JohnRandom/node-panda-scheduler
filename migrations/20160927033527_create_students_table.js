exports.up = function up(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('students', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
      table.string('name', 255).notNullable();
    }),
    knex.schema.createTable('lesson_attendees', (table) => {
      table.uuid('lesson_id').notNullable().references('lessons.id').onDelete('CASCADE');
      table.uuid('student_id').notNullable().references('students.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());

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
