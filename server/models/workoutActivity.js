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
            woActivities: [{type: Schema.Types.ObjectId, ref: "woActivity"}]
        },
        {
            timestamps: true,
        }
    )

module.exports = mongoose.model('WorkoutActivity', workoutActivitySchema);