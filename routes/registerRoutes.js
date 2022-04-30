const passport = require('passport');
const { PASSWORD_MIN_LEN } = require('../config/config.js');
const { User } = require('../model/model.js');
const { sendEmail } = require('../utils/sendEmail.js');
const { welcomeSubject, welcomeContent } = require('../config/staticData.js');
const { emailToUsername, initUserContent } = require('../utils/utils.js');

// GET "/register"
exports.getRegister = function (req, res) {
  if (req.isAuthenticated())
    res.redirect(`/user/${emailToUsername(req.user.username)}/home`);
  else res.render('register', { pwMinLen: PASSWORD_MIN_LEN });
};

// POST "/register"
exports.postRegister = function (req, res) {
  const [email, password, phone] = [
    req.body.username,
    req.body.password,
    req.body.phone,
  ];

  User.register({ username: email }, password, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect('/register');
    } else {
      initUserContent(email, phone);

      passport.authenticate('local')(req, res, () => {
        // sendEmail(email, welcomeSubject, welcomeContent);
        res.redirect(`/user/${emailToUsername(req.user.username)}/home`);
      });
    }
  });
};
