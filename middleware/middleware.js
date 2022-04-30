const passport = require('passport');
const fs = require('fs');

const { DB_URL } = require('../config/config.js');
const { UserDetails } = require('../model/model.js');

const logFile = 'routeHits.log';

const logger = function (req, res, next) {
  let toLog;
  
  if (DB_URL.includes('localhost')) {
    toLog = `hit: "${req.url}" at: ${String(Date()).slice(0, 25)}\n`;
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
  const foundUserDetails = await UserDetails.findOne({
    email: req.user.username,
  });

  if (!foundUserDetails) return;

  // to pass on params to next middlewares use res.local.<anything> = 'something'
  res.locals.toRender = {};
  res.locals.toRender['username'] = foundUserDetails.username;
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
