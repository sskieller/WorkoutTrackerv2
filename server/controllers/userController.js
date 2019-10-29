const jwt = require('jsonwebtoken');
const User = require('../models/user');
const httpStatus = require('http-status-codes'),
    passport = require('passport');
require('../config/passport');

const getUserParams = (body) => {
    console.log("Body for request printed: ");
    console.log(body);
    return {
        username: body.username,
        password: body.password,
        name: {
            firstName: body.firstName,
            lastName: body.lastName
        }
    };
};

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
    // TODO: Create User via Array
    loginUser: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(`User logged in: ${user.name.firstName} ${user.name.lastName}`);
            if (user) {
                let signedToken = jwt.sign(
                    {
                        data: user.username,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    process.env.JWT_SECRET
                );
                res.json({
                    success: true,
                    token: signedToken
                });
            } else {
                res.json({
                    success: false,
                    message: "Could not authenticate user."
                });
            }
        })(req,res,next);
    },

    logoutUser: (req,res,next) => {
        console.log("NOT IMPLEMENTED");
    },

    getUserByName: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
    },

    updateUser: (req,res,next) => {
        console.log("NOT IMPLEMENTED");
    },

    deleteUser: (req,res,next) => {
        console.log("NOT IMPLEMENTED");
    },

    // HELPER FUNCTIONS
    respondJSON: (req, res) => {
        res.json({
            status: httpStatus.OK,
            data: res.locals
        });
    },
    errorJSON: (error, req, res, next) => {
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

    verifyJWT: (req,res,next) => {
        let token = req.headers.token; // Retrieve JWT token from header
        if (token) {
            jwt.verify( // Verify JWT and decode payload
                token, process.env.JWT_SECRET,
                (errors, payload) => {
                    if (payload) {
                        User.findById(payload.data).then(user => { // Check for a user with user ID from JWT payload
                            if (user) {
                                next(); // Call next middleware function if user found
                            } else {
                                res.status(httpStatus.FORBIDDEN).json({
                                    error: true,
                                    message: "No User account found."
                                });
                            }
                        });
                    } else {
                        res.status(httpStatus.UNAUTHORIZED).json({
                            error: true,
                            message: "Cannot verify API token." // Respond with error if token not verified
                        });
                        next();
                    }
                }
            );
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide token" // Respond with error if token not found in header
            });
        }
    }
};