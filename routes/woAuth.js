const passport = require('passport');
const { products, featureIcons } = require('../models/data.js');
const { User, UserData } = require('../models/model.js');

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
  res.render('login');
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
      passport.authenticate('local')(req, res, function () {
        res.redirect('/user/home');
      });
    }
  });
};

// GET "/register"
const getRegister = function (req, res) {
  res.render('register');
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

exports.woAuthRoutes = {
  getIndex,
  getLogin,
  postLogin,
  getRegister,
  postRegister,
};
