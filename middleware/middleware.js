const passport = require('passport');
const fs = require('fs');
const { config } = require('../config/config.js');
const { model } = require('../model/model.js');
const { utils } = require('../utils/utils.js');
const logFile = 'routeHits.log';

const logger = function (req, res, next) {
  let toLog;

  if (config.DB_URL.includes('localhost')) {
    toLog = `hit: ${req.method} "${req.url}" at: ${String(Date()).slice(
      0,
      25
    )}\n`;

    fs.appendFileSync(logFile, toLog, err => {
      if (err) throw err;
    });
  }

  console.log(toLog.slice(0, -1));
  next();
};

// "/user/*"
const authCheck = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

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
