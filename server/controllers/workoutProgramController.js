const httpStatus = require("http-status-codes");
const WorkoutProgram = require("../models/workoutProgram");
const WorkoutExercise = require("../models/workoutExercise");
const WorkoutActivity = require("../models/workoutActivity");
const User = require("../models/user");

const getWorkoutProgramParams = body => {
  return {
    name: body.name,
    description: body.description
  };
};

module.exports = {
  getAllWorkoutProgram: (req, res, next) => {
	  console.log("RUNNING WORKOUT PROGRAM FIND");
    WorkoutProgram.find()
	//   .populate("exercises")
      //   .populate("activities")
      .populate({
        path: "exercises",
        populate: { path: "exercises" }
      })
      .then(workoutProgram => {
		console.log("PROGRAMS")
        console.log(workoutProgram);
        res.json({
          workoutProgram
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          success: false,
          error: "No workout programs found"
        });
      });
  },

  getAllWorkoutProgramByUserId: (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
      .populate("workoutPrograms")
      .populate({
        path: "workoutPrograms",
        populate: { path: "exercises" }
      })
      .then(programs => {
        console.log("PROGRAMS");
        console.log(programs.workoutPrograms);
        res.json(programs.workoutPrograms);
      });
  },

  createWorkoutProgram: (req, res, next) => {
    const newProgram = new WorkoutProgram(getWorkoutProgramParams(req.body));
    WorkoutProgram.create(newProgram, (err, workoutProgram) => {
      if (err) {
        res.statusCode = 500;
        return res.json({
          errors: ["Failed to create new workout Program"]
        });
      }
      if (!workoutProgram) {
        res.statusCode = 500;
        return res.json({
          errors: ["Failed to retrieve workout Program after creation"]
        });
      }
      User.findByIdAndUpdate(
        req.params.userId,
        { $push: { workoutPrograms: workoutProgram } },
        (err, user) => {
          if (err) {
            res.statusCode = 500;
            WorkoutProgram.findByIdAndDelete(workoutProgram._id);
            return res.json({
              errors: [
                "Failed to update user with new workout Program Id. Deleted the workout program again"
              ]
            });
          }
          if (!user) {
            res.statusCode = 500;
            return res.json({
              errors: ["Failed to retrieve user after update"]
            });
          }

          res.statusCode = 201;
          res.json(workoutProgram);
        }
      );
    });
  },

  getWorkoutProgramById: (req, res, next) => {
    const workoutProgramId = req.params.workoutProgramId;
    WorkoutProgram.findById(workoutProgramId)
      .populate({
        path: "exercises",
        populate: { path: "exercises" }
      })
      .populate({
        path: "activities",
        populate: { path: "activities" }
      })
      .then(program => {
        res.json({
          program
        });
      });
  },

  updateWorkoutProgramById: (req, res, next) => {
    const programId = req.params.workoutProgramId;
    WorkoutProgram.findById(programId, (err, program) => {
      if (!err) {
        // If name or description has changed, they're updated to program
        if (req.body.name && req.body.description)
          WorkoutProgram.findByIdAndUpdate(
            programId,
            {
              $set: { name: req.body.name, description: req.body.description }
            },
            (err, program) => {
              if (err)
                console.log("Failed to update name and description on program");
              if (program)
                console.log("Updated name and description on program");
            }
          );
        else if (req.body.name)
          WorkoutProgram.findByIdAndUpdate(
            programId,
            { $set: { name: req.body.name } },
            (err, program) => {
              if (err) console.log("Failed to update name on program");
              if (program) console.log("Updated name on program");
            }
          );
        else if (req.body.description)
          WorkoutProgram.findByIdAndUpdate(
            programId,
            { $set: { description: req.body.description } },
            (err, program) => {
              if (err) console.log("Failed to update description on program");
              if (program) console.log("Updated description on program");
            }
          );

        // If req.body.exercises is non-empty
        const reqExercises = req.body.exercises;
        if (reqExercises.length > 0)
          reqExercises.forEach(reqEx => {
            console.log("reqEx:");
            console.log(reqEx);
            WorkoutExercise.create(reqEx, (err, exercise) => {
              if (err) {
                console.log("Exercise could not be created");
                console.log(err);
              }

              if (exercise) {
                console.log("Exercise created");
                WorkoutProgram.findByIdAndUpdate(
                  req.params.workoutProgramId,
                  { $push: { exercises: exercise } },
                  (err, program) => {
                    if (err) {
                      console.log(
                        "Exercise could not be added. Deleting exercise"
                      );
                      WorkoutExercise.findByIdAndDelete(exercise._id);
                    }

                    if (program)
                      console.log("Exercise added to workout Program");
                  }
                );
              }
            });
          });

        res.json({
          program
        });
      }
      if (err)
        res.json({
          success: false,
          errors: [err]
        });
    });
  },

  deleteWorkoutProgramById: (req, res, next) => {
    if (req) {
      const programId = req.params.workoutProgramId;
      WorkoutProgram.findByIdAndDelete(programId, err => {
        if (err)
          res.json({
            success: false
          });
        else
          res.json({
            success: true
          });
      });
    }
  }
};
