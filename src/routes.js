require('dotenv').config();
const https = require('https');
const { run } = require('./database.js');
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
  res.render('login');
};

// POST "/login"
const postLogin = function (req, res) {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect('/home');
};

// GET "/register"
const getRegister = function (req, res) {
  res.render('register');
};

// POST "/register"
const postRegister = function (req, res) {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect('/home');
};

// GET "/home"
const getHome = function (req, res) {
  res.render('auth/home', { homeProducts });
};

// GET "/products/precision-irrigation"
const getPI = function (req, res) {
  res.render('auth/products/precision-irrigation');
};

// GET "/products/crop-suggestion"
const getCS = function (req, res) {
  res.render('auth/products/crop-suggestion', { csFeatures });
};

// GET "/products/fertilizer-suggestion"
const getFS = function (req, res) {
  res.render('auth/products/fertilizer-suggestion', { fsFeatures });
};

// GET & POST "/current-stat/weather-forecast"
const getWF = function (req, res) {
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

        res.render('auth/current-stat/weather-forecast-result', {
          weatherParams,
        });
      });
    });
  } else {
    res.render('auth/current-stat/weather-forecast');
  }
};

// GET "/current-stat/view-land"
const getViewLand = function (req, res) {
  res.render('auth/current-stat/view-land');
};

// GET "/current-stat/crop-details"
const getCropDetails = async function (req, res) {
  const values = await run().catch(console.dir);

  res.render('auth/current-stat/crop-details', { values });
};

// GET "/settings"
const settings = function (req, res) {
  res.render('auth/settings');
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

  all,
};
