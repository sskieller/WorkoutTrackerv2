const mongoose = require('mongoose'),
    {Schema} = mongoose,
    WorkoutProgram = require('./workoutProgram'),
    passportLocalMongoose = require('passport-local-mongoose'),


    userSchema = new Schema(
        {
            username: {
                type: String,
                required:true,
                trim: true,
            },
            password: {
                type: String,
            },
            name: {
                firstName: {
                    type: String,
                    required: true,
                    trim: true,
                },
                lastName: {
                    type: String,
                    required: true,
                    trim: true,
                }
            },
            workoutPrograms: [{type: Schema.Types.ObjectId, ref: "workoutProgram"}],
            workoutActivities: [{type: Schema.Types.ObjectId, ref: "workoutActivity"}],

            lastLoggedOut: {
                type: String,
                default: "0"
            }
        },
        {
            timestamps: true,
        }
    );

    userSchema.plugin(passportLocalMongoose);

    module.exports = mongoose.model('User', userSchema);