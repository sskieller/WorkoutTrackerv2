'use strict';
// Materials to be used: 
// Get Programming with Nodejs: Chapter 24 and 28
// Angular Development with Typescript: Chapter 7, 11 & 12
// recipe_app
// Postman
// MongoDb
// http://localhost:3000/api-docs/#/
// https://app.swaggerhub.com/apis/awayfromkeyboard/swagger-workout-tracker/1.0.0
const db = require('./db-init');

const createError = require('http-errors'),
  express = require('express'),
  router = require('./routes/index'),

  passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const logger = require('morgan'),
  path = require('path'),
  cookieParser = require('cookie-parser'),

  app = express(),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./api/wtapi.json');

// APP.USE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/v1", router);

// Router


router.use('/api-docs', swaggerUi.serve);
router.use('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = app;