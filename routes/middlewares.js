const passport = require('passport');

const { DB_URL } = require('../config/config.js');
const { UserDetails } = require('../model/model.js');


const fs = require('fs');
const logFile = 'routeHits.log';

const logger = function (req, res, next) {
  if (DB_URL.includes('localhost')) {
    const toLog = `hit: "${req.url}" at: ${String(Date()).slice(0, 25)}\n`;
    console.log(toLog.slice(0, -1));

    fs.appendFileSync(logFile, toLog, err => {
      if (err) throw err;
    });
  }
  next();
};

const authCheck = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

const addNameToNav = function (req, res, next) {
  UserDetails.findOne({ email: req.user.username }, function (err, foundUserDetails) {
    // to pass on params to next middlewares use res.local.<anything> = 'something'
    res.locals.toRenderObj = {};
    res.locals.toRenderObj['name'] = foundUserDetails.name;
    next();
  });
};

const authenticateLogin = passport.authenticate('local', {
  // failure redirect to this route to render error on page
  failureRedirect: '/login?success=false',
  failureMessage: true,
})

exports.middlewares = {
  logger,
  authCheck,
  addNameToNav,
  authenticateLogin
};
