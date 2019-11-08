const mongoose = require( "mongoose" );
const {Schema} = mongoose;
const WorkoutExercise = require( "./workoutExercise" );
const WorkoutActivity = require( "./activities" );

const workoutActivitySchema = new Schema(
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
		extra: {
			type: String
		}
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model( "WorkoutActivity", workoutActivitySchema );
