const express = require('express');
const router = express.Router(),
    userController = require('../controllers/userController'),
    passport = require('passport');
require('../config/passport');

// Create

router.get("/", passport.authenticate('jwt', {session:false}), (req,res,next) => {
    console.log("What");
    return res.status(200).json({
        message: "You've reached the API",
    });
})
// Login and authentication
router.post("/login", userController.login);
// Index
router.post("/", userController.create);

router.get("/:username", passport.authenticate('jwt', {session: false}), 
    userController.show, userController.respondJSON)
// CRUD


router.use(userController.errorJSON);

module.exports = router;