const express = require('express');
const router = express.Router();
const teacherRoutes = require('./teachers');
const lessonRoutes = require('./lessons');


router.use('/teachers', teacherRoutes);
router.use('/lessons', lessonRoutes);


module.exports = router;
