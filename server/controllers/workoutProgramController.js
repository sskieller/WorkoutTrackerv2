"use strict";
const httpStatus = require('http-status-codes'),
    WorkoutProgram = require('../models/workoutProgram'),
    User = require('../models/user');

const getWorkoutProgramParams = (body) => {
    return {
        name: body.name,
        description: body.description
    };
};

const getNonNullWorkoutProgramParams = (body, workoutProgram) => {
    workoutProgram.name = body.name ? body.name : workoutProgram.name;
    workoutProgram.description = body.description ? body.description : workoutProgram.description;

    return workoutProgram;
}

module.exports = {
    getAllWorkoutProgram: (req, res, next) => {
        WorkoutProgram.find()
            .then(programs => {
                res.json({
                    programs
                });
                next();
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    error: "No workout programs found"
                });
            });
    },

    createWorkoutProgram: (req, res, next) => {
        let newProgram = new WorkoutProgram(getWorkoutProgramParams(req.body));
        let userId = req.params.userId;

        WorkoutProgram.create(newProgram, (err, workoutProgram) => {
            if (err) {
                console.log("FAILED TO CREATE WORKOUT PROGRAM");
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to create new workout Program']
                });
            }
            if (!workoutProgram) {
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to retrieve workout Program after creation']
                });
            }
            console.log("WORKOUTPROGRAM._ID");
            console.log(workoutProgram._id);
            User.findByIdAndUpdate(userId, { $push: { workoutPrograms: workoutProgram._id } },
                (err, user) => {
                    if (err) {
                        console.log("FAILED TO UPDATE USER");
                        res.statusCode = 500;
                        WorkoutProgram.findByIdAndDelete(workoutProgram._id);
                        return res.json({
                            errors: ['Failed to update user with new workout Program Id']
                        });
                    }
                    console.log("USER:");
                    console.log(user);
                    if (!user) {
                        res.statusCode = 500;
                        return res.json({
                            errors: ['Failed to retrieve user after update']
                        });
                    }

                    console.log("CREATED NEW WORKOUT PROGRAM");
                    res.statusCode = 201;
                    res.json(workoutProgram);
                });
        });
    },

    getWorkoutProgramById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },

    updateWorkoutProgramById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },

    deleteWorkoutProgramById: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },
}