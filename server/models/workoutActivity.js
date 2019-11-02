const mongoose = require('mongoose'),
    { Schema } = mongoose,
    WorkoutExercise = require('./workoutExercise'),

    workoutActivitySchema = new Schema(
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
            exercises: [{ type: Schema.Types.ObjectId, ref: "WorkoutExercise" }],
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('WorkoutActivity', workoutActivitySchema);