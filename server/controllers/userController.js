const jwt = require('jsonwebtoken');
const User = require('../models/user');
const httpStatus = require('http-status-codes'),
    passport = require('passport');
require('../config/passport');
// TODO: Status codes

module.exports = {
    // Updates only user information. 
    // To update arrays, i.e. workoutPrograms or workoutActivities go to the proper controllers
    updateUser: (req, res, next) => {
        let userId = req.params.userId;
        User.findById(userId, (err, user) => {
            if (!err) {
                let newDataUser = getNonNullUserParams(req.body, user);
                user.save((err, newDataUser) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("User saved: " + newDataUser);
                });
                res.locals.user = newDataUser;
                next();
            }
        })
    },

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

    createUsersWithArrayInput: (req,res,next) => {
        if (req) {
            console.log("NOT IMPLEMENTED");
        }
        res.json({
            success: false,
            error: "NOT IMPLEMENTED"
        });
    },

    loginUser: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(`User logged in: ${user.name.firstName} ${user.name.lastName}`);
            if (user) {
                let userId = { data: user._id }
                let signedToken = jwt.sign(
                    userId,
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

    logoutUser: (req, res, next) => {
        let token = req.headers.token; // Retrieve JWT token from header
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (errors, payload) => { // Verify JWT and decode payload
                if (payload) {
                    User.findById(payload.data).then(user => { // Check for a user with user ID from JWT payload
                        if (user) {
                            let userId = { data: user._id }
                            let oldToken = token;
                            let signedToken = jwt.sign(
                                userId,
                                process.env.JWT_SECRET + user.password,
                                { expiresIn: '1d' }
                            );
                            console.log(oldToken);
                            console.log(signedToken);
                            res.json({
                                success: true,
                                token: signedToken,
                                userId: user._id
                            });
                            //next(); // Call next middleware function if user found
                        } else {
                            res.status(httpStatus.FORBIDDEN).json({
                                error: true,
                                message: "No User account found."
                            });
                        }
                    });
                }
            });
        }
    },

    getUserByName: (req, res, next) => {
        if (req) {
            let userId = req.params.userId;
            User.findById(userId)
                .then(user => {
                    res.locals.user = user;
                    next();
                });
        }
    },

    deleteUser: (req, res, next) => {
        if (req) {
            let userId = req.params.userId;
            User.findByIdAndDelete(userId, (err) => {
                if (err) {
                    res.json({
                        success: false
                    });
                } else {
                    res.json({
                        success: true
                    });
                }
            });
        }
    },
};

const getUserParams = (body) => {
    return {
        username: body.username,
        password: body.password,
        name: {
            firstName: body.name.firstName,
            lastName: body.name.lastName
        }
    };
};
const getNonNullUserParams = (body, user) => {
    // Check if body contains and create object thereafter
    user.username = body.username ? body.username : user.username;
    user.password = body.password ? body.password : user.password;
    user.name.firstName = body.name.firstName ? body.name.firstName : user.name.firstName;
    user.name.lastName = body.name.lastName ? body.name.lastName : user.name.lastName;

    return user;
}