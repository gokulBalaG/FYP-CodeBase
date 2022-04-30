const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { config } = require('./config.js');
const { initDB } = require('./db.js');
const { model } = require('../model/model.js');

module.exports.initApp = function (rootDir) {
  const db = initDB(config.DB_URL);
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(rootDir + '/public'));
  app.set('view engine', 'ejs');
  app.set('views', [rootDir + '/views', rootDir + '/views/user']);

  // Authentication setup

  app.use(
    session({
      secret: config.EXPRESS_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(model.User.createStrategy());
  passport.serializeUser(model.User.serializeUser());
  passport.deserializeUser(model.User.deserializeUser());

  return app;
};
