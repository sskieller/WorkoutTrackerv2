const express = require('express');
const router = express.Router(),
    helperFunctions = require('../controllers/helperFunctions'),
    userController = require('../controllers/userController'),
    passport = require('passport'); // Needed
require('../config/passport');


// Index
router.post("/new"
    , userController.createUser
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.post("/createWithArray"
    , userController.createUsersWithArrayInput
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.post("/login"
    , userController.loginUser
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.get("/:userId/logout"
    , helperFunctions.verifyJWT
    , userController.logoutUser
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.get("/:userId"
    , helperFunctions.verifyJWT
    , userController.getUserByName
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.put("/:userId"
    , helperFunctions.verifyJWT
    , userController.updateUser
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);
router.delete("/:userId"
    , helperFunctions.verifyJWT
    , userController.deleteUser
    , helperFunctions.respondJSON
    , helperFunctions.errorJSON);

router.use(helperFunctions.errorJSON);

module.exports = router;