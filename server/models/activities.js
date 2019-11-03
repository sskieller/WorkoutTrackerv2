const mongoose = require('mongoose'),
    { Schema } = mongoose,

    activitiesSchema = new Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            description: {
                type: String,
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

module.exports = mongoose.model("woActivity", activitiesSchema);