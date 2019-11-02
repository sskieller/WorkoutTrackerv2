const express = require('express'),
    router = express.Router(),
    helperFunctions = require('../controllers/helperFunctions'),
    workoutActivityController = require('../controllers/workoutActivityController');

// Index for /user/:userId/workoutActivity
router.get("/"
    , helperFunctions.verifyJWT
    , workoutActivityController.getAllWorkoutActivity
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.post("/new"
    ,helperFunctions.verifyJWT
    ,workoutActivityController.createWorkoutActivity
    ,helperFunctions.respondJSON
    ,helperFunctions.errorJSON);
router.get("/:workoutActivityId"
    ,helperFunctions.verifyJWT
    ,workoutActivityController.getWorkoutActivityById
    ,helperFunctions.respondJSON
    ,helperFunctions.errorJSON);
router.put("/:workoutActivityId"
    ,helperFunctions.verifyJWT
    ,workoutActivityController.updateWorkoutActivityById
    ,helperFunctions.respondJSON
    ,helperFunctions.errorJSON);
router.delete("/:workoutActivityId"
    ,helperFunctions.verifyJWT
    ,workoutActivityController.deleteWorkoutActivityById
    ,helperFunctions.respondJSON
    ,helperFunctions.errorJSON);
module.exports = router;