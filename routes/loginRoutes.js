const passport = require('passport');
const { PASSWORD_MIN_LEN } = require('../config/config.js');
const { User } = require('../model/model.js');
const { sendEmail } = require('../utils/sendEmail.js');
const { newLoginSubject } = require('../config/staticData.js');
const { emailToUsername, generateOnLoginEmail } = require('../utils/utils.js');

// GET "/login"
exports.getLogin = function (req, res) {
  if (req.isAuthenticated())
    res.redirect(`/user/${emailToUsername(req.user.username)}/home`);
  else {
    // check if url consists of error msg
    if (req.query.success)
      res.render('login', { pwMinLen: PASSWORD_MIN_LEN, incorrectPwd: true });
    else
      res.render('login', { pwMinLen: PASSWORD_MIN_LEN, incorrectPwd: false });
  }
};

// POST "/login"
exports.postLogin = function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) console.log(err);
    else {
      passport.authenticate('local')(req, res, () => {
        // // send email on login - disabled temporarily
        // const content = generateOnLoginEmail();
        // sendEmail(req.body.username, newLoginSubject, content);
        
        res.redirect(`/user/${emailToUsername(req.body.username)}/home`);
      });
    }
  });
};
