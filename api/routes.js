const express = require('express');
const router = express.Router();
const teacherRoutes = require('./teachers');


router.use('/teachers', teacherRoutes);


module.exports = router;
