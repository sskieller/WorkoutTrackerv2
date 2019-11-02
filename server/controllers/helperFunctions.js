const jwt = require('jsonwebtoken'),
    httpStatus = require('http-status-codes'),
    User = require('../models/user');

const getJWT = (req) => {
    return (req.headers.authorization.split(" ").pop());
}

module.exports = {
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
            res.json(errorObject);
        } else {
            errorObject = {
                status: httpStatus.OK,
                message: "Unknown Error."
            };
            res.json(errorObject);
        }
    },

    // TODO: DELETE jwt FROM CLIENT, INSTEAD OF FROM SERVER (WRITE IN CONCLUSION ABOUT IT)
    verifyJWT: (req, res, next) => {
        // let token = req.headers.authorization.split(" ").pop(); // Retrieve JWT token from header
        let token = getJWT(req);
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
                    //next(); // Allows a ton of "cannot set header after sent"-errors if activated
                }
            });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({
                error: true,
                message: "Provide token" // Respond with error if token not found in header
            });
        }
    },
}