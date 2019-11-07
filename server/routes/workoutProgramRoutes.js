const express = require("express");
const router = express.Router();
const helperFunctions = require("../controllers/helperFunctions");
const workoutProgramController = require("../controllers/workoutProgramController");

// Index for /user/:userId/workoutProgram
router.get(
  "/:userId/workoutProgram/",
  helperFunctions.verifyJWT,
  workoutProgramController.getAllWorkoutProgram,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);
router.post(
  "/:userId/workoutProgram/new",
  helperFunctions.verifyJWT,
  workoutProgramController.createWorkoutProgram,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);
router.get(
  "/:userId/workoutProgram/user",
  helperFunctions.verifyJWT,
  workoutProgramController.getAllWorkoutProgramByUserId,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);
router.get(
  "/:userId/workoutProgram/:workoutProgramId",
  helperFunctions.verifyJWT,
  workoutProgramController.getWorkoutProgramById,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);
router.put(
  "/:userId/workoutProgram/:workoutProgramId",
  helperFunctions.verifyJWT,
  workoutProgramController.updateWorkoutProgramById,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);
router.delete(
  "/:userId/workoutProgram/:workoutProgramId",
  helperFunctions.verifyJWT,
  workoutProgramController.deleteWorkoutProgramById,
  helperFunctions.respondJSON,
  helperFunctions.errorJSON
);

module.exports = router;
