'use strict';
// Materials to be used: 
// Get Programming with Nodejs: Chapter 24 and 28
// Angular Development with Typescript: Chapter 7, 11 & 12
// recipe_app
// Postman
// MongoDb
// http://localhost:3000/api-docs/#/
// https://app.swaggerhub.com/apis/awayfromkeyboard/swagger-workout-tracker/1.0.0

/* 
  Create routes for "/:userId/workoutProgram/:workoutProgramId/workoutActivity" etc.
  The activities should be written next to the exercise
              | name | description | sets | repstime |
              ----------------------------------------
  exercise:   | bobi | lalala 1234 | 320  | 2 reps   |
  activities: | bobi | lalala 1234 | 233  | 5 reps   |
              ----------------------------------------
*/

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

const swaggerAPIVersion = '1.1.0';
const swaggerUi = require('swagger-ui-express'),
  swaggerOptions = {
  swaggerOptions: {
    url: 'https://api.swaggerhub.com/apis/awayfromkeyboard/swagger-workout-tracker/'+swaggerAPIVersion+'/swagger.json'
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
console.log(`New API file loaded. Version: ${swaggerAPIVersion}`);
app.use("/api/v1", router);

module.exports = app;