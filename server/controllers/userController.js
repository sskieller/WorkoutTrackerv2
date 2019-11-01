const jwt = require('jsonwebtoken');
const User = require('../models/user');
const httpStatus = require('http-status-codes'),
    passport = require('passport');
require('../config/passport');

const redis = require('redis');
const JWTR = require('jwt-redis').default;
const redisClient = redis.createClient();
console.log(`Redis initialized at port: 6379`);
const jwtr = new JWTR(redisClient);


const getUserParams = (body) => {
    console.log("getUserParams: ");
    console.log(body);
    return {
        username: body.username,
        password: body.password,
        name: {
            firstName: body.name.firstName,
            lastName: body.name.lastName
        }
    };
};
const getNonNullUserParams = (body) => {
    // Check if body contains and create object thereafter
    let nonNullUser = {};
    if (body.username)
        Object.assign(nonNullUser, { username: body.username })
    if (body.password)
        Object.assign(nonNullUser, { password: body.password })

    if (body.name.firstName && body.name.lastName)
        Object.assign(nonNullUser, { name: { firstName: body.name.firstName, lastName: body.name.lastName } })
    else if (body.name.firstName)
        Object.assign(nonNullUser, { name: { firstName: body.name.firstName } })
    else if (body.name.lastName)
        Object.assign(nonNullUser, { name: { lastName: body.name.lastName } })

    if (body.workoutPrograms)
        Object.assign(nonNullUser, { workoutPrograms: body.workoutPrograms })

    if (body.workoutActivities)
        Object.assign(nonNullUser, { workoutActivities: body.workoutActivities })

    return nonNullUser;
}

module.exports = {
    createUser: (req, res, next) => {
        if (req.skip) next();
        console.log(req.body);
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (error) {
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to create new user']
                })
            }
            if (!user) {
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to retrieve user after creation']
                })
            }

            res.statusCode = 201;
            res.json(user);
        })
    },
    // TODO: NEW FUNCTION: Create User via Array
    loginUser: (req, res, next) => {
        passport.authenticate('local', async (err, user, info) => {
            console.log(`User logged in: ${user.name.firstName} ${user.name.lastName}`);
            if (user) {
                let pl = { data: user._id }
                let signedToken = await jwtr.sign(
                    pl,
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                );
                res.json({
                    success: true,
                    token: signedToken,
                    userId: user._id
                });
            } else {
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
            }
        })(req, res, next);
    },

    // TODO: Status codes
    logoutUser: (req, res, next) => {
        console.log("LOGOUT REACHED")
        let token = req.headers.token; // Retrieve JWT token from header
        if (token) {
            console.log("Token found");
        }
        jwtr.destroy(token);
        next();
    },

    // TODO: STATUS CODES
    getUserByName: (req, res, next) => {
        let userId = req.params.userId;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
    },

    // TODO: STATUS CODES
    // Updates only user information. To update arrays, i.e. workoutPrograms or workoutActivities
    // go to the proper controllers
    updateUser: (req, res, next) => {
        let userId = req.params.userId;
        let nonNullUser = getNonNullUserParams(req.body);

        User.findByIdAndUpdate(userId, { $set: nonNullUser }, { upsert: false, new: true })
            .then(newUser => {
                res.locals.user = newUser;
                next();
            })
    },

    deleteUser: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
            res.json({
                success: true
            })
        }
    },

    // HELPER FUNCTIONS
    respondJSON: (req, res) => {
        console.log("RESPONDJSON REACHED")
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
        console.log("ERRORJSON REACHED")
        let errorObject;
        if (error) {
            errorObject = {
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error.message
            };
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown Error."
            };
        }
        res.json(errorObject);
    },
    // https://github.com/azuqua/jwt-redis-session
    verifyJWT: (req, res, next) => {
        let token = req.headers.token; // Retrieve JWT token from header
        if (token) {
            console.log("verifying1")
            jwtr.verify(token, process.env.JWT_SECRET).then(payload => {
                if (payload) {
                    console.log("verifying2")
                    User.findById(payload.data).then(user => { // Check for a user with user ID from JWT payload
                        if (user) {
                            console.log("verifying3")
                            next(); // Call next middleware function if user found
                        } else {
                            res.status(httpStatus.FORBIDDEN).json({
                                error: true,
                                message: "No User account found."
                            });
                        }
                    });
                }
            }).catch(errors => {
                res.status(httpStatus.UNAUTHORIZED).json({
                    error: true,
                    message: "Cannot verify API token." // Respond with error if token not verified
                });
                next();
            })
        }
        // jwtr.verify(token, process.env.JWT_SECRET, (errors, payload) => { // Verify JWT and decode payload
        //     console.log("verifying1.5")
        //     if (payload) {
        //         console.log("verifying2")
        //         User.findById(payload.data).then(user => { // Check for a user with user ID from JWT payload
        //             if (user) {
        //                 console.log("verifying3")
        //                 next(); // Call next middleware function if user found
        //             } else {
        //                 console.log("verifying4")
        //                 res.status(httpStatus.FORBIDDEN).json({
        //                     error: true,
        //                     message: "No User account found."
        //                 });
        //             }
        //         });
        //     } else {
        //         console.log("verifying5")
        //         res.status(httpStatus.UNAUTHORIZED).json({
        //             error: true,
        //             message: "Cannot verify API token." // Respond with error if token not verified
        //         });
        //         console.log("verifying6")
        //         next();
        //     }
        // });
        // } else {
        //     console.log("verifying7")
        //     res.status(httpStatus.UNAUTHORIZED).json({
        //         error: true,
        //         message: "Provide token" // Respond with error if token not found in header
        //     });
        // }
    },
};