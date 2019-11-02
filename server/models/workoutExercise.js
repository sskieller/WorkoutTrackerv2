const mongoose = require('mongoose'),
    { Schema } = mongoose,

    workoutExerciseSchema = new Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
                required: true,
            },
            sets: {
                type: Number, 
                required: true,
                min: 0,
                max: 1000,
            },
            repstime: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model("WorkoutExercise", workoutExerciseSchema);