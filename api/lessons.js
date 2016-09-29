const objects = require('./objects');
const router = require('express').Router();
const codes = require('./codes');


router.get('/', (req, res) => {
  objects.lessons.all().then((data) => {
    res.json(data);
  });
});

router.post('/', (req, res) => {
  const lesson = objects.lessons.validate(req);
  const errors = req.validationErrors();

  if (errors) {
    res.status(codes.UNPROCESSABLE).json(errors);
  } else {
    objects.teachers.get({ id: req.body.teacher_id }).then(() => {
      objects.lessons.create(lesson).then(() => {
        res.status(codes.CREATED).json(lesson);
      });
    }).catch(() => {
      res.status(codes.NOT_FOUND).json({
        param: 'teacher_id',
        msg: 'Teacher does not exist',
        value: req.body.teacher_id
      });
    });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  objects.lessons.get({ id }).then((lesson) => {
    res.json(lesson);
  }).catch(() => {
    res.status(codes.NOT_FOUND).json({
      msg: 'The lesson with ID "' + req.params.id + '" doesn\'t exist'
    });
  });
});

router.post('/:id/attend', (req, res) => {
  const id = req.params.id;
  const student = objects.students.validate(req);

  objects.lessons.get({ id }).then((row) => {
    objects.lessons.attend(row, student).then(() => {
      res.status(codes.CREATED).json(student);
    });
  }).catch(() => {
    res.status(codes.NOT_FOUND).json({
      msg: 'The lesson with ID "' + req.params.id + '" doesn\'t exist'
    });
  });
});

module.exports = router;
