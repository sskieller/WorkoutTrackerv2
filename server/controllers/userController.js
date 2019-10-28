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
    create: (req, res, next) => {
        if (req.skip) next();

        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if (error) {
                console.log(error);
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to create new user']
                })
            }

            if (!user) {
                console.log(error);
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to retrieve user after creation']
                })
            }

            res.statusCode = 201;
            res.json(user);
        })

    },

    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            console.log(user.firstName);
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

    show: (req, res, next) => {
        let userId = req.params.id;
        User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
    },

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
};