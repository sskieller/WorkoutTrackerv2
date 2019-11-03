const mongoose = require( "mongoose" );
const {Schema} = mongoose;
const WorkoutExercise = require( "./workoutExercise" );

const workoutProgramSchema = new Schema(
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
		exercises: [{type: Schema.Types.ObjectId, ref: "WorkoutExercise"}],
		activities: [{type: Schema.Types.ObjectId, ref: "WorkoutActivity"}],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model( "WorkoutProgram", workoutProgramSchema );
