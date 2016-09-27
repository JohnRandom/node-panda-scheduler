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
});
