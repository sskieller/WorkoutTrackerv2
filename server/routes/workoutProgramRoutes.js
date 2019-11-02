const express = require('express'),
    router = express.Router(),
    helperFunctions = require('../controllers/helperFunctions'),
    workoutProgramController = require('../controllers/workoutProgramController');

// Index for /user/:userId/workoutProgram
router.get("/"
    , helperFunctions.verifyJWT
    , workoutProgramController.getAllWorkoutProgram
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.post("/new"
    , helperFunctions.verifyJWT
    , workoutProgramController.createWorkoutProgram
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.get("/:workoutProgramId"
    , helperFunctions.verifyJWT
    , workoutProgramController.getWorkoutProgramById
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.put("/:workoutProgramId"
    , helperFunctions.verifyJWT
    , workoutProgramController.updateWorkoutProgramById
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.delete("/:workoutProgramId"
    , helperFunctions.verifyJWT
    , workoutProgramController.deleteWorkoutProgramById
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);

module.exports = router;