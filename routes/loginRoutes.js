const passport = require('passport');
const { config } = require('../config/config.js');
const { model } = require('../model/model.js');
const { utils } = require('../utils/utils.js');

// GET "/login"
exports.getLogin = function (req, res) {
  if (req.isAuthenticated())
    res.redirect(`/user/${utils.emailToUsername(req.user.username)}/home`);
  else {
    const toRender = {
      pwMinLen: config.PASSWORD_MIN_LEN,
    };

    // check if url consists of ?success=<true|false> (coming from middlewares/verifyLogin -> failure redirect)
    if (req.query.success) toRender['incorrectPwd'] = true;
    else toRender['incorrectPwd'] = false;

    // check if url consists of ?signinAgain=<true|false> (coming from resetPassword/registerNewPassword)
    if (req.query.signinAgain) toRender['signinAgain'] = true;

    res.render('login', { toRender });
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
        // const content = `${config.newLoginContent} <strong>${utils.generateDateString()}</strong>`;

        // utils.sendEmail(req.body.username, config.newLoginSubject, content);

        res.redirect(`/user/${utils.emailToUsername(req.body.username)}/home`);
      });
    }
  });
};
