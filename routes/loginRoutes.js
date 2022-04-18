const passport = require('passport');
const { User } = require('../models/model.js');
const { PASSWORD_MIN_LEN } = require('../config/config.js');

// GET "/login"
const getLogin = function (req, res) {
  if (req.isAuthenticated()) res.redirect('/user/home');
  else {
    // check if url consists of error msg
    if (req.query.success)
      res.render('login', { pwMinLen: PASSWORD_MIN_LEN, incorrectPwd: true });
    else
      res.render('login', { pwMinLen: PASSWORD_MIN_LEN, incorrectPwd: false });
  }
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

exports.loginRoutes = {
  getLogin,
  postLogin,
};
