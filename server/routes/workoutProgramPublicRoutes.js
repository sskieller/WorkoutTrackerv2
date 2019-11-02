const express = require('express'),
    router = express.Router(),
    helperFunctions = require('../controllers/helperFunctions'),
    workoutProgramPublicController = require('../controllers/workoutProgramPublicController');

// Index for /workoutProgram
router.get("/"
    , workoutProgramPublicController.getPublicWorkoutProgram
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);


module.exports = router;