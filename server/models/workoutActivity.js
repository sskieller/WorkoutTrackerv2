const mongoose = require('mongoose'),
    { Schema } = mongoose,
    WorkoutExercise = require('./workoutExercise'),
    WorkoutActivity = require('./activities'),

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
            activities: [{type: Schema.Types.ObjectId, ref: "Activities"}]
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('WorkoutActivity', workoutActivitySchema);