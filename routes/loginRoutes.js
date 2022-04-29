const passport = require('passport');
const { PASSWORD_MIN_LEN } = require('../config/config.js');
const { User } = require('../model/model.js');
const { sendEmail } = require('../utils/sendEmail.js');
const { newLoginSubject, newLoginContent } = require('../config/staticData.js');
const { emailToUsername } = require('../utils/utils.js');

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
        // const date = String(Date());
        // const datePart = date.slice(0, 15);
        // const time = date.slice(16, 24);
        // const dateString = `${datePart} at ${time}`;

        // const content = `${newLoginContent} <strong>${dateString}</strong>`;

        // // send email on login - disabled temporarily
        // sendEmail(req.body.username, newLoginSubject, content);

        res.redirect(`/user/${emailToUsername(req.body.username)}/home`);
      });
    }
  });
};
