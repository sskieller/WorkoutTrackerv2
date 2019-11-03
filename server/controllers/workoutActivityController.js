"use strict";
const httpStatus = require('http-status-codes'),
    WorkoutActivity = require('../models/workoutProgram'),
    WorkoutExercise = require('../models/workoutExercise'),
    WorkoutProgram = require('../models/workoutProgram'),
    User = require('../models/user');

const getWorkoutActivityParams = (body) => {
    return {
        name: body.name,
        description: body.description
    };
};

module.exports = {
    getAllWorkoutActivity: (req, res, next) => {
        WorkoutActivity.find()
        .populate(woActivities)
            .then(woActivities => {
                res.json({
                    woActivities
                });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    error: "No workout activities found"
                });
            });
    },

    createWorkoutActivity: (req, res, next) => {
        let newActivity = new WorkoutActivity(getWorkoutActivityParams(req.body));
        WorkoutActivity.create(newActivity, (err, workoutActivity) => {
            if (err) {
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to create new workout Activity']
                });
            }
            if (!workoutActivity) {
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to retrieve workout activity after creation']
                });
            }
            WorkoutProgram.findByIdAndUpdate(req.params.workoutProgramId, { $push: { activities: workoutActivity } },
                (err, program) => {
                    if (err) {
                        res.statusCode = 500;
                        WorkoutActivity.findByIdAndDelete(workoutActivity._id);
                        return res.json({
                            errors: ['Failed to update workout program with new workout activity Id. Deleted the workout program again']
                        });
                    }
                    if (!program) {
                        res.statusCode = 500;
                        return res.json({
                            errors: ['Failed to retrieve workout program after update']
                        });
                    }

                    res.statusCode = 201;
                    res.json(workoutActivity);
                });
        });
    },

    getWorkoutActivityById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },

    updateWorkoutActivityById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },

    deleteWorkoutActivityById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },
}