'use strict';

const helpers = require('./test_helpers');
const knex = helpers.knex;
const resetDB = helpers.resetDB;
const host = helpers.host;
const $ = require('superagent');


describe('/lessons', () => {
  describe('GET', () => {
    let lesson;
    let response;
    let teacher;

    beforeEach((done) => {
      resetDB().then(() => {
        teacher = {
          id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7',
          name: 'The Dude'
        };
        lesson = {
          id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
          name: 'English 101',
          weekday: 0,
          description: 'Just another lesson.',
          time_starting: '15:00:00',
          time_ending: '16:30:00',
          teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
        };
        knex('teachers').insert(teacher).then(() => {
          knex('lessons').insert(lesson).then(() => {
            $.get(host + '/api/lessons').end((err, resp) => {
              response = resp;
              done();
            });
          });
        });
      });
    });

    it('returns status code 200', () => {
      expect(response.status).to.equal(200);
    });

    it('returns "accplication/json" as "Content-Type" header', () => {
      const header = 'application/json; charset=utf-8';

      expect(response.headers['content-type']).to.equal(header);
    });

    it('returns the list of lessons', () => {
      expect(response.body).to.deep.equal([lesson]);
    });
  });

  describe('POST', () => {
    let lesson;
    let response;
    let teacher;

    context('with validate POST data', () => {
      beforeEach((done) => {
        resetDB().then(() => {
          teacher = {
            id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7',
            name: 'The Dude'
          };
          lesson = {
            id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
            name: 'English 101',
            weekday: 0,
            description: 'Just another lesson.',
            time_starting: '15:00:00',
            time_ending: '16:30:00',
            teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
          };
          knex('teachers').insert(teacher).then(() => {
            $.post(host + '/api/lessons')
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(lesson))
              .end((err, resp) => {
                response = resp;
                done();
              });
          });
        });
      });

      it('returns status code 201', () => {
        expect(response.status).to.equal(201);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns the lesson', () => {
        expect(response.body).to.deep.equal(lesson);
      });

      it('creates a database entry for the lesson', (done) => {
        knex('lessons').first('id').where({ id: lesson.id }).then((row) => {
          expect(row).to.exist;
          expect(row.id).to.equal(lesson.id);
          done();
        });
      });
    });

    context('with invalidate POST data', () => {
      beforeEach((done) => {
        resetDB().then(() => {
          teacher = {
            id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7',
            name: 'The Dude'
          };
          lesson = {
            id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
            weekday: 7,
            teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
          };
          knex('teachers').insert(teacher).then(() => {
            $.post(host + '/api/lessons')
              .set('Content-Type', 'application/json')
              .send(JSON.stringify(lesson))
              .end((err, resp) => {
                response = resp;
                done();
              });
          });
        });
      });

      it('returns status code 422', () => {
        expect(response.status).to.equal(422);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns the lesson', () => {
        expect(response.body).to.deep.equal([
          { param: 'name', msg: 'Invalid text value for "name"' },
          { param: 'time_starting',
            msg: 'Invalid text value for "time_starting"' },
          { param: 'time_ending',
          msg: 'Invalid text value for "time_ending"' }
        ]);
      });

      it('does not create a database entry for the lesson', (done) => {
        knex('lessons').select('id').where({ id: lesson.id }).then((rows) => {
          expect(rows).to.be.empty;
          done();
        });
      });
    });

    context('without an existing teacher', () => {
      beforeEach((done) => {
        resetDB().then(() => {
          lesson = {
            id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
            name: 'English 101',
            weekday: 0,
            description: 'Just another lesson.',
            time_starting: '15:00:00',
            time_ending: '16:30:00',
            teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
          };
          $.post(host + '/api/lessons')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(lesson))
            .end((err, resp) => {
              response = resp;
              done();
            });
        });
      });

      it('returns status code 201', () => {
        expect(response.status).to.equal(404);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns an error', () => {
        expect(response.body).to.deep.equal({
          'msg': 'Teacher does not exist',
          'param': 'teacher_id',
          'value': 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
        });
      });

      it('does not create a database entry for the lesson', (done) => {
        knex('lessons').select('id').where({ id: lesson.id }).then((rows) => {
          expect(rows).to.be.empty;
          done();
        });
      });
    });
  });
});

describe('/lessons/:id', () => {
  describe('GET', () => {
    let response;

    context('with an exsting lesson', () => {
      let lesson;
      let teacher;

      beforeEach((done) => {
        resetDB().then(() => {
          const url = '/api/lessons/79689f8f-598e-45f3-b1e0-2396021d8a8a';
          teacher = {
            id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7',
            name: 'The Dude'
          };
          lesson = {
            id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
            name: 'English 101',
            weekday: 0,
            description: 'Just another lesson.',
            time_starting: '15:00:00',
            time_ending: '16:30:00',
            teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
          };
          knex('teachers').insert(teacher).then(() => {
            knex('lessons').insert(lesson).then(() => {
              $.get(host + url).end((err, resp) => {
                response = resp;
                done();
              });
            });
          });
        });
      });

      it('returns status code 200', () => {
        expect(response.status).to.equal(200);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns the list of lessons', () => {
        expect(response.body).to.deep.equal(lesson);
      });
    });
  });
});

describe('/lessons/:id/attend', () => {
  describe('GET', () => {
    let response;

    context('with an exsting lesson', () => {
      let lesson;
      let teacher;
      let student;

      beforeEach((done) => {
        resetDB().then(() => {
          teacher = {
            id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7',
            name: 'The Dude'
          };
          lesson = {
            id: '79689f8f-598e-45f3-b1e0-2396021d8a8a',
            name: 'English 101',
            weekday: 0,
            description: 'Just another lesson.',
            time_starting: '15:00:00',
            time_ending: '16:30:00',
            teacher_id: 'aa3341d9-b8bd-454c-af89-7a79a0b4f9a7'
          };
          student = {
            id: '65d8286c-66fb-40f0-90d4-b62720bd58b5',
            name: 'Walter'
          };
          const url = '/api/lessons/' + lesson.id + '/attend';

          knex('teachers').insert(teacher).then(() => {
            knex('lessons').insert(lesson).then(() => {
              $.post(host + url)
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(student))
                .end((err, resp) => {
                  response = resp;
                  done();
                });
            });
          });
        });
      });

      it('returns status code 201', () => {
        expect(response.status).to.equal(201);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns the student', () => {
        expect(response.body).to.deep.equal(student);
      });

      it('registers the lesson attendance', (done) => {
        knex('lesson_attendees').first('student_id', 'lesson_id')
          .then((row) => {
            expect(row).to.deep.equal({
              student_id: '65d8286c-66fb-40f0-90d4-b62720bd58b5',
              lesson_id: '79689f8f-598e-45f3-b1e0-2396021d8a8a'
            });
            done();
          });
      });
    });

    context('without an exsting lesson', () => {
      let student;

      beforeEach((done) => {
        resetDB().then(() => {
          student = {
            id: '65d8286c-66fb-40f0-90d4-b62720bd58b5',
            name: 'Walter'
          };
          const url = '/api/lessons/lesson_id/attend';

          $.post(host + url)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(student))
            .end((err, resp) => {
              response = resp;
              done();
            });
        });
      });

      it('returns status code 201', () => {
        expect(response.status).to.equal(404);
      });

      it('returns "accplication/json" as "Content-Type" header', () => {
        const header = 'application/json; charset=utf-8';

        expect(response.headers['content-type']).to.equal(header);
      });

      it('returns an error', () => {
        expect(response.body).to.deep.equal({
          'msg': 'The lesson with ID \"lesson_id\" doesn\'t exist'
        });
      });

      it('does not register the attendance', (done) => {
        knex('lesson_attendees').select('student_id').then((rows) => {
          expect(rows).to.be.empty;
          done();
        });
      });
    });
  });
});
