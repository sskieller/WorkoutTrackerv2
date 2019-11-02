"use strict";
const httpStatus = require('http-status-codes'),
    WorkoutActivity = require('../models/workoutProgram'),
    WorkoutExercise = require('../models/workoutExercise'),
    User = require('../models/user');

const getWorkoutActivitiesParams = (body) => {
    return {
        name: body.name,
        description: body.description
    };
};


module.exports = {
    getAllWorkoutActivity: (req, res, next) => {
        WorkoutActivity.find()
            .then(activities => {
                res.json({
                    activities
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
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
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