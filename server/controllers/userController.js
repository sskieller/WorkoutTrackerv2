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
                        data: user._id,
                        exp: new Date().setDate(new Date().getDate() + 1)
                    },
                    process.env.JWT_SECRET
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

    logoutUser: (req, res, next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
            res.json({
                success: true
            })
        }
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
    updateUser: (req, res, next) => {
        let userId = req.params.userId;
        let user = getUserParams(req.body);
        User.findByIdAndUpdate(userId, {$set:user}, {upsert: true, new: true})
            .then(user => {
                res.locals.user = user;
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

    verifyJWT: (req, res, next) => {
        let token = req.headers.token; // Retrieve JWT token from header
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (errors, payload) => { // Verify JWT and decode payload
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
            });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide token" // Respond with error if token not found in header
            });
        }
    }
};