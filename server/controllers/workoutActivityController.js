const httpStatus = require("http-status-codes");
const WorkoutActivity = require("../models/workoutActivity");
const WorkoutExercise = require("../models/workoutExercise");
const WorkoutProgram = require("../models/workoutProgram");
const woActivities = require("../models/activities");
const User = require("../models/user");

const getWorkoutActivityParams = body => {
  return {
    name: body.name,
    description: body.description
  };
};

const getWorkoutActivityParam = body => {
  return {
    name: body.name,
    description: body.description,
    extra: body.extra
  };
};

module.exports = {
  getAllWorkoutActivity: (req, res, next) => {
    WorkoutActivity.find()
      .populate("woActivities")
      .then(woActivities => {
		  WorkoutProgram.findById(req.params.workoutProgramId)
        res.json({
          woActivities
        });
      })
      .catch(err => {
        console.log(err);
        res.json({
          success: false,
          error: "No workout activities found"
        });
      });
  },

  getAllWorkoutActivities: (req,res,next) => {
    WorkoutProgram.findById(req.params.workoutProgramId)
      .populate("activities")
    .then(data => {
      res.json({
        data
      });
    });
  },

  createWorkoutActivity1: (req,res,next) => {
    const newActivity = new WorkoutActivity(getWorkoutActivityParam(req.body));

    console.log(req.body);
    console.log(newActivity);
    WorkoutActivity.create(newActivity, (err, workoutActivity) => {
      if (err) {
        res.statusCode = 500;
        return res.json({
          errors: ["Failed to create new workout Activity"]
        });
      }

      WorkoutProgram.findByIdAndUpdate(
        req.params.workoutProgramId,
        { $push: { activities: workoutActivity } },
        (err, program) => {
          if (err) {
            res.statusCode = 500;
            WorkoutActivity.findByIdAndDelete(workoutActivity._id);
            return res.json({
              errors: [
                "Failed to update workout program with new workout activity Id. Deleted the workout program again"
              ]
            });
          }
          if (!program) {
            res.statusCode = 500;
            return res.json({
              errors: ["Failed to retrieve workout program after update"]
            });
          }

          res.statusCode = 201;
          res.json(workoutActivity);
        }
      );
    });
  },

  createWorkoutActivity: (req, res, next) => {
    const newActivity = new WorkoutActivity(getWorkoutActivityParams(req.body));
    WorkoutActivity.create(newActivity, (err, workoutActivity) => {
      if (err) {
        res.statusCode = 500;
        return res.json({
          errors: ["Failed to create new workout Activity"]
        });
      }
      if (!workoutActivity) {
        res.statusCode = 500;
        return res.json({
          errors: ["Failed to retrieve workout activity after creation"]
        });
      }
      WorkoutProgram.findByIdAndUpdate(
        req.params.workoutProgramId,
        { $push: { activities: workoutActivity } },
        (err, program) => {
          if (err) {
            res.statusCode = 500;
            WorkoutActivity.findByIdAndDelete(workoutActivity._id);
            return res.json({
              errors: [
                "Failed to update workout program with new workout activity Id. Deleted the workout program again"
              ]
            });
          }
          if (!program) {
            res.statusCode = 500;
            return res.json({
              errors: ["Failed to retrieve workout program after update"]
            });
          }

          res.statusCode = 201;
          res.json(workoutActivity);
        }
      );
    });
  },

  getWorkoutActivityById: (req, res, next) => {
    const workoutActivityId = req.params.workoutActivityId;
    WorkoutActivity.findById(workoutActivityId)
      .populate({
        path: "woActivities",
        populate: { path: "woActivities" }
      })
      .then(activity => {
        res.json(activity);
      });
  },

  updateWorkoutActivityById: (req, res, next) => {
    const activityId = req.params.workoutActivityId;
    WorkoutActivity.findById(activityId, (err, activity) => {
      // If name or description has changed, they're updated to activity
      if (req.body.name && req.body.description)
        WorkoutActivity.findByIdAndUpdate(
          activityId,
          { $set: { name: req.body.name, description: req.body.description } },
          (err, activity) => {
            if (err)
              console.log("Failed to update name and description on activity");
            if (activity)
              console.log("Updated name and description on activity");
          }
        );
      else if (req.body.name)
        WorkoutActivity.findByIdAndUpdate(
          activityId,
          { $set: { name: req.body.name } },
          (err, activity) => {
            if (err) console.log("Failed to update name on activity");
            if (activity) console.log("Updated name on activity");
          }
        );
      else if (req.body.description)
        WorkoutActivity.findByIdAndUpdate(
          activityId,
          { $set: { description: req.body.description } },
          (err, activity) => {
            if (err) console.log("Failed to update description on activity");
            if (activity) console.log("Updated description on activity");
          }
        );

      // If req.body.activities is non-empty
      const reqActivities = req.body.activities;
      if (reqActivities.length > 0)
        reqActivities.forEach(reqAc => {
          console.log("reqAc:");
          console.log(reqAc);
          woActivities.create(reqAc, (err, activity) => {
            if (err) {
              console.log("activity could not be created");
              console.log(err);
            }

            if (activity) {
              console.log("activity created");
              WorkoutActivity.findByIdAndUpdate(
                req.params.workoutActivityId,
                { $push: { woActivities: activity } },
                (err, activity) => {
                  if (err) {
                    console.log(
                      "activity could not be added. Deleting activity"
                    );
                    woActivities.findByIdAndDelete(activity._id);
                  }

                  if (activity)
                    console.log("activity added to workout activity");
                }
              );
            }
          });
        });

      res.json({
        activity
      });
    });
  }
};
