const express = require('express');
const router = express.Router(),
    userController = require('../controllers/userController'),
    passport = require('passport');
require('../config/passport');


// Index
router.post("/new", userController.createUser, userController.respondJSON, userController.errorJSON);
// TODO: createWithArray
router.post("/login", userController.loginUser, userController.respondJSON);

router.post("/:username/logout", userController.verifyJWT, passport.authenticate('jwt', {session: false}),
    userController.logoutUser, userController.respondJSON);
router.get("/:username", userController.verifyJWT, passport.authenticate('jwt', {session: false}), 
    userController.getUserByName, userController.respondJSON)
router.put("/:username", userController.verifyJWT, passport.authenticate('jwt', {session: false}),
    userController.updateUser, userController.respondJSON);
router.delete("/:username", userController.verifyJWT, passport.authenticate('jwt', {session: false}),
    userController.deleteUser, userController.respondJSON);

router.use(userController.errorJSON);

module.exports = router;