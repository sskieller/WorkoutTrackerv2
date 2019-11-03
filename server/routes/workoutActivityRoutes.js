const express = require( "express" );
const router = express.Router();
const helperFunctions = require( "../controllers/helperFunctions" );
const workoutActivityController = require( "../controllers/workoutActivityController" );

// Index for /user/:userId/workoutActivity
router.get( "/:userId/workoutProgram/:workoutProgramId/workoutActivity"
	, helperFunctions.verifyJWT
	, workoutActivityController.getAllWorkoutActivity
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.post( "/:userId/workoutProgram/:workoutProgramId/workoutActivity/new"
	, helperFunctions.verifyJWT
	, workoutActivityController.createWorkoutActivity
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.get( "/:userId/workoutProgram/:workoutProgramId/workoutActivity/:workoutActivityId"
	, helperFunctions.verifyJWT
	, workoutActivityController.getWorkoutActivityById
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.put( "/:userId/workoutProgram/:workoutProgramId/workoutActivity/:workoutActivityId"
	, helperFunctions.verifyJWT
	, workoutActivityController.updateWorkoutActivityById
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
module.exports = router;
