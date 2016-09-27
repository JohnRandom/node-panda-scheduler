const knex = require('./db');
const express = require('express');
const router = express.Router();
const codes = require('./codes');
const uuid = require('node-uuid');


const TIMESTAMP = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;


router.get('/', (req, res) => {
  knex.select(
    'id',
    'name',
    'description',
    'weekday',
    'time_starting',
    'time_ending',
    'teacher_id'
  ).from('lessons').then((rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  if (req.body.uuid) {
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

  const errors = req.validationErrors();
  if (errors) {
    res.status(codes.UNPROCESSABLE).json(errors);
  } else {
    knex.select('id').from('teachers').where({ id: req.body.teacher_id })
      .then((rows) => {
        if (rows.length > 0) {
          const lesson = {
            id: req.body.id || uuid.v4(),
            name: req.body.name,
            description: req.body.description,
            weekday: req.body.weekday,
            time_starting: req.body.time_starting,
            time_ending: req.body.time_ending,
            teacher_id: req.body.teacher_id
          };
          knex('lessons').insert(lesson).then(() => {
            res.status(codes.CREATED).json(lesson);
          });
        } else {
          res.status(codes.NOT_FOUND).json({
            param: 'teacher_id',
            msg: 'Teacher does not exist',
            value: req.body.teacher_id
          });
        }
      });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex.select(
    'id',
    'name',
    'description',
    'weekday',
    'time_starting',
    'time_ending',
    'teacher_id'
  ).from('lessons').where({ id }).then((rows) => {
    if (rows.length) {
      const lesson = rows[0];
      res.json(lesson);
    } else {
      res.status(codes.NOT_FOUND).json({});
    }
  });
});

module.exports = router;
