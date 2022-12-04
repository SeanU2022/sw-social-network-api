const router = require('express').Router();
// const courseRoutes = require('./courseRoutes');
// const studentRoutes = require('./studentRoutes');

// router.use('/courses', courseRoutes);
// router.use('/students', studentRoutes);

const userRoutes = require('./userRoutes');
// router.use('/user', userRoutes);
router.use('/users', userRoutes);


module.exports = router;
