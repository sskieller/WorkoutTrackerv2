const express = require('express');
const router = express.Router(),
    userController = require('../controllers/userController'),
    passport = require('passport');
require('../config/passport');


// Index
router.post("/new", userController.createUser);

// TODO: createWithArray

router.post("/login", userController.login, userController.respondJSON);


router.get("/", passport.authenticate('jwt', {session:false}), (req,res,next) => {
    return res.status(200).json({
        message: "You've reached the API",
    });
})

router.post("/:username/logout", passport.authenticate('jwt', {session: false}),
    userController.logoutUser, userController.respondJSON);
router.get("/:username", passport.authenticate('jwt', {session: false}), 
    userController.getUser, userController.respondJSON)
router.put("/:username", passport.authenticate('jwt', {session: false}),
    userController.updateUser, userController.respondJSON);
router.delete("/:username", passport.authenticate('jwt', {session: false}),
    userController.deleteUser, userController.respondJSON);

router.use(userController.errorJSON);

module.exports = router;