const passport = require('passport');
const { User, UserData } = require('../models/model.js');
const { PASSWORD_MIN_LEN } = require('../config/config.js');

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
        // store userdata
        const userData = new UserData({
          email: req.body.username,
          name: req.body.name,
          phone: req.body.phone,
        });
        userData.save();

        passport.authenticate('local')(req, res, function () {
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
