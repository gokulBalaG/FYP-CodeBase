const passport = require('passport');
const { PASSWORD_MIN_LEN } = require('../config/config.js');
const { User, UserDetails } = require('../model/model.js');
const { sendEmail } = require('../utils/sendEmail.js');
const { welcomeSubject, welcomeContent } = require('../config/staticData.js');

// GET "/register"
const getRegister = function (req, res) {
  if (req.isAuthenticated()) res.redirect('/user/home');
  else res.render('register', { pwMinLen: PASSWORD_MIN_LEN });
};

// POST "/register"
const postRegister = function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect('/register');
      } else {
        // store user details
        const userDetails = new UserDetails({
          email: req.body.username,
          name: req.body.name,
          phone: req.body.phone,
          verified: false,
        });
        userDetails.save();

        passport.authenticate('local')(req, res, () => {
          // send email on signup
          sendEmail(req.body.username, welcomeSubject, welcomeContent);
          res.redirect('/user/home');
        });
      }
    }
  );
};

exports.registerRoutes = {
  getRegister,
  postRegister,
};
