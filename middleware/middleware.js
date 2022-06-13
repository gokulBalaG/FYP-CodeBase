const passport = require('passport');
const fs = require('fs');
const { config } = require('../config/config.js');
const { model } = require('../model/model.js');
const { utils } = require('../utils/utils.js');
const logFile = 'routeHits.log';

// logger middleware to log url hits (locally)
const logger = function (req, res, next) {
  const log = `HIT: ${req.method} ${req.url} at ${String(Date()).slice(
    0,
    25
  )}\n`;

  if (config.DB_URL.includes('localhost')) {
    fs.appendFileSync(logFile, log, err => {
      if (err) throw err;
    });
  }

  console.log(log);
  next();
};

// check if user is authenticated else redirect to login page
// "/user/*"
const authCheck = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

// check if user exists, if yes then add the username to the navbar, and add other placeholders to be rendered
// "/user/*"
const addNameToNav = async function (req, res, next) {
  const foundUser = await model.User.findOne({
    username: req.user.username,
  });

  if (!foundUser) return;

  // to pass on params to next middlewares use res.local.<anything> = 'something'
  // for navbar (navbar.ejs)
  const username = utils.emailToUsername(foundUser.username);

  res.locals.toRender = {
    username: username,
    navBrandUrl: `/user/${username}/home`,
    cropSuggestionUrl: `/user/${username}/products/crop-suggestion`,
    fertilizerSuggestionUrl: `/user/${username}/products/fertilizer-suggestion`,
    precisionIrrigationUrl: `/user/${username}/products/precision-irrigation`,
    userSettings: `/user/${username}/settings`,
    logout: `/user/${username}/logout`,
  };

  next();
};

// verify login on credentials input, if not auth then redirect to failureRedirect
// "login" failure redirect to this route to render error on page
const verifyLogin = passport.authenticate('local', {
  failureRedirect: '/login?success=false',
  failureMessage: true,
});

exports.mw = {
  logger,
  authCheck,
  addNameToNav,
  verifyLogin,
};
