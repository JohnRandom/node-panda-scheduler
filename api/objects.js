const knex = require('./db');
const uuid = require('node-uuid');


const TIMESTAMP = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;


const lessons = {
  all: function all() {
    return knex.select(
      'lessons.id',
      'lessons.name',
      'lessons.description',
      'lessons.weekday',
      'lessons.time_starting',
      'lessons.time_ending',
      'lessons.teacher_id'
    ).from('lessons')
    .leftOuterJoin('lesson_attendees', 'lessons.id', 'lesson_id')
    .leftOuterJoin('students', 'student_id', 'students.id');
  },
  get: function get(query) {
    const response = new Promise((resolve, reject) => {
      knex.first(
        'id',
        'name',
        'description',
        'weekday',
        'time_starting',
        'time_ending',
        'teacher_id'
      ).from('lessons').where(query).then((lesson) => {
        if (!!lesson) {
          resolve(lesson);
        } else {
          reject();
        }
      }).catch(reject);
    });

    return response;
  },
  create: function create(data) {
    return knex('lessons').insert(data);
  },
  attend: function attend(lesson, student) {
    return new Promise((resolve, reject) => {
      knex.transaction((t) => {
        knex('students').transacting(t).insert(student).then(() => {
          const attendee = {
            lesson_id: lesson.id,
            student_id: student.id
          };
          knex('lesson_attendees').transacting(t).insert(attendee).then(() => {
            resolve(student);
          }).then(t.commit).catch(() => {
            t.rollback();
            reject();
          });
        }).catch(() => {
          t.rollback();
          reject();
        });
      });
    });
  },
  validate: function validate(req) {
    if (req.body.id) {
      req.checkBody('id', 'Invalid UUID value for "id"').isUUID(4);
    }
    req.checkBody('name', 'Invalid text value for "name"').len(1, 255);
    req.checkBody('weekday', 'Invalid int value for "weekday"', {
      min: 0,
      max: 6
    });
    req.checkBody('time_starting', 'Invalid text value for "time_starting"')
      .matches(TIMESTAMP);
    req.checkBody('time_ending', 'Invalid text value for "time_ending"')
      .matches(TIMESTAMP);
    req.checkBody('teacher_id', 'Invalid text value for "teacher_id"').isUUID(4);

    return {
      id: req.body.id || uuid.v4(),
      name: req.body.name,
      description: req.body.description,
      weekday: req.body.weekday,
      time_starting: req.body.time_starting,
      time_ending: req.body.time_ending,
      teacher_id: req.body.teacher_id
    };
  }
};

const teachers = {
  get: function get(query) {
    return new Promise((resolve, reject) => {
      knex('teachers').first('id', 'name').where(query).then((teacher) => {
        if (!!teacher) {
          resolve(teacher);
        } else {
          reject();
        }
      }).catch(reject);
    });
  }
};

const students = {
  validate: function validate(req) {
    if (req.body.id) {
      req.checkBody('id', 'Invalid UUID value for "id"').isUUID(4);
    }
    req.checkBody('name', 'Invalid text value for "name"').len(1, 255);

    return {
      id: req.body.id || uuid.v4(),
      name: req.body.name
    };
  }
};

module.exports = { lessons, teachers, students };
