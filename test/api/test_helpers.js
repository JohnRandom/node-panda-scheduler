/* eslint-disable */
const chai = require('chai');
const app = require('../../server');
const knex = require('../../api/db');

global.expect = chai.expect;

function resetDB() {
  return knex.raw('TRUNCATE teachers, lessons, students, lesson_attendees');
}

const host = 'http://localhost:3000'

module.exports = { knex, resetDB, host };
