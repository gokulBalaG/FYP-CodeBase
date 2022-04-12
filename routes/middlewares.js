const { UserData } = require('../models/model.js');

const authCheck = function (req, res, next) {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

const addNameToNav = function (req, res, next) {
  UserData.findOne({ email: req.user.username }, function (err, foundUserData) {
    // to pass on params to next middlewares use res.local.<anything> = 'something'
    res.locals.toRenderObj = {};
    res.locals.toRenderObj['name'] = foundUserData.name;
    next();
  });
};

exports.middlewares = {
  authCheck,
  addNameToNav,
};
