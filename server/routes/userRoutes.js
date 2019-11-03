const express = require( "express" );
const router = express.Router();
const helperFunctions = require( "../controllers/helperFunctions" );
const userController = require( "../controllers/userController" );
const passport = require( "passport" ); // Needed
require( "../config/passport" );


// Index
router.post( "/new"
	, userController.createUser
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.post( "/createWithArray"
	, userController.createUsersWithArrayInput
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.post( "/login"
	, userController.loginUser
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.get( "/:userId/logout"
	, helperFunctions.verifyJWT
	, userController.logoutUser
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.get( "/:userId"
	, helperFunctions.verifyJWT
	, userController.getUserById
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.put( "/:userId"
	, helperFunctions.verifyJWT
	, userController.updateUserById
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );
router.delete( "/:userId"
	, helperFunctions.verifyJWT
	, userController.deleteUserById
	, helperFunctions.respondJSON
	, helperFunctions.errorJSON );

router.use( helperFunctions.errorJSON );

module.exports = router;
