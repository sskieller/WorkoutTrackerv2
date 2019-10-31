'use strict';
// Materials to be used: 
// Get Programming with Nodejs: Chapter 24 and 28
// Angular Development with Typescript: Chapter 7, 11 & 12
// recipe_app
// Postman
// MongoDb
// http://localhost:3000/api-docs/#/
// https://app.swaggerhub.com/apis/awayfromkeyboard/swagger-workout-tracker/1.0.0

// https://stackoverflow.com/questions/42887387/partially-updating-nested-objects-with-multiple-values-express-js-mongodb
// https://stackoverflow.com/questions/10290621/how-do-i-partially-update-an-object-in-mongodb-so-the-new-object-will-overlay
// https://stackoverflow.com/questions/38189928/how-do-i-partially-update-an-array-inside-and-object-in-mongodb-so-the-new-value
// https://stackoverflow.com/questions/54527094/update-element-in-array-of-mongoose-schema
// https://stackoverflow.com/questions/10708109/modifying-the-last-element-of-an-array-in-mongodb
// TODO: updateUser, så den kun opdaterer NOGLE af parametrene, og ikke dem alle.

const db = require('./db-init');

const express = require('express'),
  app = express(),
  router = require('./routes/index'),
  passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());

require('dotenv').config();

const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const logger = require('morgan'),
  path = require('path'),
  cookieParser = require('cookie-parser');
  
const swaggerUi = require('swagger-ui-express'),
  swaggerOptions = {
  swaggerOptions: {
    url: 'https://api.swaggerhub.com/apis/awayfromkeyboard/swagger-workout-tracker/1.0.1/swagger.json'
  }
}

// APP.USE
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerOptions));
console.log("New API file loaded");
app.use("/api/v1", router);

module.exports = app;