const passport = require('passport');
const { config } = require('../config/config.js');
const { model } = require('../model/model.js');
const { utils } = require('../utils/utils.js');

// GET "/login"
exports.getLogin = function (req, res) {
  if (req.isAuthenticated())
    res.redirect(`/user/${utils.emailToUsername(req.user.username)}/home`);
  else {
    // check if url consists of error msg
    if (req.query.success)
      res.render('login', {
        pwMinLen: config.PASSWORD_MIN_LEN,
        incorrectPwd: true,
      });
    else
      res.render('login', {
        pwMinLen: config.PASSWORD_MIN_LEN,
        incorrectPwd: false,
      });
  }
};

// POST "/login"
exports.postLogin = function (req, res) {
  const user = new model.User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) console.log(err);
    else {
      passport.authenticate('local')(req, res, () => {
        // // send email on login - disabled temporarily
        // const content = utils.generateOnLoginEmail();
        // utils.sendEmail(req.body.username, config.newLoginSubject, content);

        res.redirect(`/user/${utils.emailToUsername(req.body.username)}/home`);
      });
    }
  });
};
