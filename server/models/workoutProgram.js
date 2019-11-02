const mongoose = require('mongoose'),
    { Schema } = mongoose,
    WorkoutExercise = require('./workoutExercise'),

    workoutProgramSchema = new Schema(
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

module.exports = mongoose.model('WorkoutProgram', workoutProgramSchema);