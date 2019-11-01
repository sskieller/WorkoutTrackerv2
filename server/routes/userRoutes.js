const express = require('express');
const router = express.Router(),
    userController = require('../controllers/userController'),
    passport = require('passport');
require('../config/passport');


// Index
router.post("/new", userController.createUser, userController.respondJSON, userController.errorJSON);
// TODO: createWithArray
router.post("/login", userController.loginUser, userController.respondJSON);

router.get("/:userId/logout"
    ,userController.verifyJWT
    ,userController.logoutUser
    ,userController.respondJSON);
router.get("/:userId"
    ,userController.verifyJWT
    ,userController.getUserByName
    ,userController.respondJSON);
router.put("/:userId"
    ,userController.verifyJWT
    ,userController.updateUser
    ,userController.respondJSON);
router.delete("/:userId"
    ,userController.verifyJWT
    ,userController.deleteUser
    ,userController.respondJSON);

router.use(userController.errorJSON);

module.exports = router;