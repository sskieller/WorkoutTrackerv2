'use strict';
require('../config/passport');

const router = require('express').Router(),
    userRoutes = require('./userRoutes');

router.use("/user", userRoutes);

module.exports = router;
