const express = require('express');
const router = express.Router();
const teacherRoutes = require('./teachers');
const lessonRoutes = require('./lessons');


router.use('/teachers', teacherRoutes);
router.use('/lessons', lessonRoutes);

// Catch all, to avoid sending application page and irnform user with a
// descriptive error message.
router.all('*', (req, resp) => {
  const url = req.originalUrl;

  resp.status(404).json({
    msg: 'Route "' + url + '" does not exist'
  });
});


module.exports = router;
