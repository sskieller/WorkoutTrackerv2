const express = require( "express" );
const router = express.Router();
const helperFunctions = require( "../controllers/helperFunctions" );
const workoutProgramPublicController = require( "../controllers/workoutProgramPublicController" );

// Index for /workoutProgram
router.get( "/"
	, workoutProgramPublicController.getPublicWorkoutProgram
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );


module.exports = router;
