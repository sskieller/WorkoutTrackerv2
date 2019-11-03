
require( "../config/passport" );

const router = require( "express" ).Router();
const userRoutes = require( "./userRoutes" );
const workoutProgramRoutes = require( "./workoutProgramRoutes" );
const workoutProgramPublicRoutes = require( "./workoutProgramPublicRoutes" );
const workoutActivityRoutes = require( "./workoutActivityRoutes" );


router.use( "/user", userRoutes );
router.use( "/user", workoutProgramRoutes );
router.use( "/user", workoutActivityRoutes );
router.use( "/workoutprogram", workoutProgramPublicRoutes );

module.exports = router;
