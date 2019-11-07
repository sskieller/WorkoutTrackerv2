
const httpStatus = require( "http-status-codes" );
const WorkoutProgram = require( "../models/workoutProgram" );

module.exports = {
	getPublicWorkoutProgram: ( req, res, next ) => {
		WorkoutProgram.find()
			// .populate( "exercises" )
			.then( ( programs ) => {
				// console.log((programs))
				res.json( {
					programs,
				} );
			} )
			.catch( ( err ) => {
				console.log( err );
				res.json( {
					success: false,
					error: "No workout programs found",
				} );
			} );
	},
};
