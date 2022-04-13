const passport = require('passport');
const { products, featureIcons } = require('../models/data.js');
const { User } = require('../models/model.js');
const { PASSWORD_MIN_LEN } = require('../config/config.js');

// Route functions

// GET "/"
const getIndex = function (req, res) {
  res.render('index', {
    products,
    featureIcons,
  });
};

// GET "/login"
const getLogin = function (req, res) {
  if (req.isAuthenticated()) res.redirect('/user/home');
  else res.render('login', { pwMinLen: PASSWORD_MIN_LEN });
};

// POST "/login"
const postLogin = function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate('local')(req, res, () =>
        res.redirect('/user/home')
      );
    }
  });
};

exports.woAuthRoutes = {
  getIndex,

  getLogin,
  postLogin,
};
