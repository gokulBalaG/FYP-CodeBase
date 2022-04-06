const https = require('https');
const passport = require('passport');
const { User, UserData, SensorsCurrData } = require('./model.js');
const { helpers } = require('./utils.js');
const { WEATHER_API_URL, WEATHER_API_IMG_URL } = require('./config.js');

const {
  products,
  featureIcons,
  homeProducts,
  fsFeatures,
  csFeatures,
} = require('./data.js');

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
  if (req.isAuthenticated()) res.redirect('/home');
  else res.render('login');
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
        res.redirect('/home');
      });
    }
  });
};

// GET "/register"
const getRegister = function (req, res) {
  if (req.isAuthenticated()) res.redirect('/home');
  else res.render('register');
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
          res.redirect('/home');
        });
      }
    }
  );
};

// AFTER AUTH

// GET "/home"
const getHome = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(
    req,
    res,
    'auth/home',
    [['homeProducts', homeProducts]],
    '/login'
  );
};

// GET "/products/precision-irrigation"
const getPI = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(
    req,
    res,
    'auth/products/precision-irrigation'
  );
};

// GET "/products/crop-suggestion"
const getCS = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(
    req,
    res,
    'auth/products/crop-suggestion',
    [['csFeatures', csFeatures]]
  );
};

// GET "/products/fertilizer-suggestion"
const getFS = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(
    req,
    res,
    'auth/products/fertilizer-suggestion',
    [['fsFeatures', fsFeatures]]
  );
};

// GET & POST "/current-stat/weather-forecast"
const getWF = function (req, res) {
  // if authenticated,
  if (req.isAuthenticated()) {
    // check if there exist inputs, if yes then handle requests
    if (req.query.cityName || req.query.latlng) {
      let URL = WEATHER_API_URL;

      if (req.query.cityName !== '') {
        const cityName = req.query.cityName.trim();
        URL += `&q=${cityName}`;
      } else if (req.query.latlng) {
        const [lat, lng] = req.query.latlng.split(' ');
        URL += `&lat=${lat}&lon=${lng}`;
      }

      https.get(URL, response => {
        response.on('data', data => {
          const weatherData = JSON.parse(data);
          const [temp, desc, icon] = [
            weatherData.main.temp,
            weatherData.weather[0].description,
            weatherData.weather[0].icon,
          ];

          const imgURL = WEATHER_API_IMG_URL + `${icon}@2x.png`;
          const weatherParams = {
            temp,
            desc,
            imgURL,
          };

          // TODO refactor unnecessary checks here //

          // res.render('auth/current-stat/weather-forecast-result', {
          //   weatherParams,
          // });

          helpers.checkIfAuthThenRenderOrRedirect(
            req,
            res,
            'auth/current-stat/weather-forecast-result',
            [['weatherParams', weatherParams]]
          );

        });
      });

      // else render page normally
    } else {
      // res.render('auth/current-stat/weather-forecast');
      helpers.checkIfAuthThenRenderOrRedirect(
        req,
        res,
        'auth/current-stat/weather-forecast'
      );
    }

    // if no auth
  } else {
    res.redirect('/login');
  }
};

// GET "/current-stat/view-land"
const getViewLand = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(
    req,
    res,
    'auth/current-stat/view-land'
  );
};

// GET "/current-stat/crop-details"
const getCropDetails = async function (req, res) {
  if (req.isAuthenticated()) {
    SensorsCurrData.find((err, values) => {
      if (err) throw err;
      else {
        values = values[0];
        console.log(values);

        // TODO skip unnecessary checks //
        helpers.checkIfAuthThenRenderOrRedirect(
          req,
          res,
          'auth/current-stat/crop-details',
          [['values', values]]
        );
      }
    });
  } else res.redirect('/login');
};

// GET "/settings"
const settings = function (req, res) {
  helpers.checkIfAuthThenRenderOrRedirect(req, res, 'auth/settings');
};

// GET "/logout"
const logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

// GET "/all"
const all = function (req, res) {
  res.status(404).send('<h1>Broooooo! Page not found</h1>');
};

exports.routes = {
  getIndex,

  getLogin,
  postLogin,

  getRegister,
  postRegister,

  getHome,

  getPI,
  getCS,
  getFS,

  getWF,

  getViewLand,
  getCropDetails,

  settings,
  logout,

  all,
};
