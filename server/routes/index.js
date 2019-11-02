'use strict';
require('../config/passport');

const router = require('express').Router(),
    userRoutes = require('./userRoutes'),
    workoutProgramRoutes = require('./workoutProgramRoutes'),
    workoutProgramPublicRoutes = require('./workoutProgramPublicRoutes'),
    workoutActivityRoutes = require('./workoutActivityRoutes');



router.use("/user", userRoutes);
router.use("/user", workoutProgramRoutes);
router.use("/user", workoutActivityRoutes);
router.use("/workoutprogram", workoutProgramPublicRoutes);

module.exports = router;
