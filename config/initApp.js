const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { EXPRESS_SESSION_SECRET } = require('./config.js');
const { User } = require('../models/model.js');

exports.initApp = function (rootDir) {
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(rootDir + '/public'));
  app.set('view engine', 'ejs');
  app.set('views', [rootDir + '/views', rootDir + '/views/auth']);

  // Authentication setup

  app.use(
    session({
      secret: EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  return app;
};
