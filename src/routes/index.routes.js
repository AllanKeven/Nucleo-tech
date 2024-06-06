const express = require('express');
const userRoutes = require('./users.routes');
const courseRoutes = require('./courses.routes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/course', courseRoutes);


module.exports = router;
