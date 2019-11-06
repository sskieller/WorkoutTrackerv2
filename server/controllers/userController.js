const jwt = require( "jsonwebtoken" );
const User = require( "../models/user" );
const httpStatus = require( "http-status-codes" );
const passport = require( "passport" );
require( "../config/passport" );
// TODO: Status codes

const getUserParams = ( body ) => {
	console.log(body);
	return {
		username: body.username,
		password: body.password,
		name: {
			firstName: body.firstName,
			lastName: body.lastName,
		},
	};
};
const getNonNullUserParams = ( body, user ) => {
	// Check if body contains and create object thereafter
	const newDataUser = user;
	newDataUser.username = body.username ? body.username : user.username;
	newDataUser.password = body.password ? body.password : user.password;
	newDataUser.name.firstName = body.name.firstName ? body.name.firstName : user.name.firstName;
	newDataUser.name.lastName = body.name.lastName ? body.name.lastName : user.name.lastName;

	return newDataUser;
};

const getJWT = ( req ) => {
	return ( req.headers.authorization.split( " " ).pop() );
};

module.exports = {
	// Updates only user information.
	// To update arrays, i.e. workoutPrograms or workoutActivities go to the proper controllers
	updateUserById: ( req, res, next ) => {
		const userId = req.params.userId;
		User.findById( userId, ( err, user ) => {
			const oldUsername = user.username;
			if ( !err ) {
				const newDataUser = getNonNullUserParams( req.body, user );
				// if username same just update
				if ( oldUsername === newDataUser.username )
					user.save( ( err, newDataUser ) => {
						if ( err ) {
							console.log( err );
							return;
						}
						// If save succeeded
						if ( newDataUser )
						// Return new user data to client
							User.findById( userId, ( err, user ) => {
								res.json( {
									user,
								} );
							} );
					} );
				else
				// If username not equal, check if other user has it
					User.findOne( {"username": oldUsername}, ( err, usr ) => {
						// if no user with that name found
						if ( err ) {
							user.save( ( err, newDataUser ) => {
								if ( err ) {
									console.log( err );
									return;
								}
							} );
							res.locals.user = newDataUser;
							next();
						}
						if ( usr )
							res.json( {
								success: false,
								error: "Username already exists",
							} );
					} );
			}
		} );
	},

	createUser: ( req, res, next ) => {
		const newUser = new User( getUserParams( req.body ) );
		User.register( newUser, req.body.password, ( error, user ) => {
			if ( error ) {
				console.log(error);
				res.statusCode = 500;
				return res.json( {
					errors: ["Failed to create new user", error.message],
					message: error.message
				} );
			}
			if ( !user ) {
				res.statusCode = 500;
				return res.json( {
					errors: ["Failed to retrieve user after creation"],
				} );
			}

			res.statusCode = 201;
			res.json( user );
		} );
	},

	createUsersWithArrayInput: ( req, res, next ) => {
		if ( req )
			console.log( "NOT IMPLEMENTED" );

		res.json( {
			success: false,
			error: "NOT IMPLEMENTED",
		} );
	},

	loginUser: ( req, res, next ) => {
		passport.authenticate( "local", ( err, user, info ) => {
			// console.log( `User logged in: ${user.name.firstName} ${user.name.lastName}` );
			if ( user ) {
				const userId = {data: user._id};
				const signedToken = jwt.sign(
					userId,
					process.env.JWT_SECRET,
					{expiresIn: "1d"}
				);
				res.json( {
					success: true,
					token: signedToken,
					user: user
				} );
			} else {
				res.json( {
					success: false,
					message: "Could not authenticate user.",
				} );
			}
		} )( req, res, next );
	},

	logoutUser: ( req, res, next ) => {
		// let token = req.headers.authorization.split(" ").pop(); // Retrieve JWT token from header
		const token = getJWT( req );
		if ( token )
			jwt.verify( token, process.env.JWT_SECRET, ( errors, payload ) => { // Verify JWT and decode payload
				if ( payload )
					User.findById( payload.data ).then( ( user ) => { // Check for a user with user ID from JWT payload
						if ( user ) {
							const userId = {data: user._id};
							const oldToken = token;
							const signedToken = jwt.sign(
								userId,
								process.env.JWT_SECRET + user.password,
								{expiresIn: "1d"}
							);
							console.log( oldToken );
							console.log( signedToken );
							res.json( {
								success: true,
								token: signedToken,
								userId: user._id,
							} );
							// next(); // Call next middleware function if user found
						} else {
							res.status( httpStatus.FORBIDDEN ).json( {
								error: true,
								message: "No User account found.",
							} );
						}
					} );
			} );
	},

	getUserById: ( req, res, next ) => {
		if ( req ) {
			const userId = req.params.userId;
			console.log( req.params.userId );
			User.findById( userId )
				.populate( {
					path: "workoutPrograms",
					populate: {path: "workoutPrograms"},
				} )
				.then( ( user ) => {
					res.locals.user = user;
					next();
				} );
		}
	},

	deleteUserById: ( req, res, next ) => {
		if ( req ) {
			const userId = req.params.userId;
			User.findByIdAndDelete( userId, ( err ) => {
				if ( err )
					res.json( {
						success: false,
					} );
				else
					res.json( {
						success: true,
					} );
			} );
		}
	},
};

