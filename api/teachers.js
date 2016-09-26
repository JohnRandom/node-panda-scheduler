const knex = require('./db');
const express = require('express');
const router = express.Router();
const codes = require('./codes');
const uuid = require('node-uuid');


router.get('/', (req, res) => {
  knex.select('id', 'name').from('teachers').then((rows) => {
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  if (req.body.uuid) {
    req.checkBody('id', 'Invalid UUID value for "id"').isUUID(4);
  }
  req.checkBody('name', 'Invalid text value for "name"').len(1, 255);

  const errors = req.validationErrors();
  if (errors) {
    res.status(codes.UNPROCESSABLE).json(errors);
  } else {
    const teacher = {
      id: req.body.uuid || uuid.v4(),
      name: req.body.name
    };
    knex('teachers').insert(teacher).then(() => {
      res.status(codes.CREATED).json(teacher);
    });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  knex.select('id', 'name').from('teachers').where({ id }).then((rows) => {
    if (rows.length) {
      const teacher = rows[0];
      res.json(teacher);
    } else {
      res.status(codes.NOT_FOUND).json({});
    }
  });
});

module.exports = router;
