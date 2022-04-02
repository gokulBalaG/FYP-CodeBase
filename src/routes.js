require("dotenv").config();
const https = require("https");
const weatherAPIKey = process.env.WEATHER_API_KEY;
const { WEATHER_API_URL, WEATHER_API_IMG_URL } = require("./config.js");

const {
  products,
  featureIcons,
  homeProducts,
  fsFeatures,
  csFeatures,
} = require("./data.js");

// Route functions

// GET "/"
const getIndexRoute = function (req, res) {
  res.render("index", {
    products,
    featureIcons,
  });
};

// GET "/login"
const getLoginRoute = function (req, res) {
  res.render("login");
};

// POST "/login"
const postLoginRoute = function (req, res) {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect("/home");
};

// GET "/register"
const getRegisterRoute = function (req, res) {
  res.render("register");
};

// POST "/register"
const postRegisterRoute = function (req, res) {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect("/home");
};

// GET "/home"
const getHomeRoute = function (req, res) {
  res.render("auth/home", { homeProducts });
};

// GET "/products/precision-irrigation"
const getPIRoute = function (req, res) {
  res.render("auth/products/precision-irrigation");
};

// GET "/products/crop-suggestion"
const getCSRoute = function (req, res) {
  res.render("auth/products/crop-suggestion", { csFeatures });
};

// GET "/products/fertilizer-suggestion"
const getFSRoute = function (req, res) {
  res.render("auth/products/fertilizer-suggestion", { fsFeatures });
};

// GET & POST "/current-stat/weather-forecast"
const getWFRoute = function (req, res) {
  if (req.query.cityName || req.query.latlng) {
    let URL = WEATHER_API_URL + `&appid=${weatherAPIKey}`;

    if (req.query.cityName !== "") {
      const cityName = req.query.cityName.trim();
      URL += `&q=${cityName}`;
    } else if (req.query.latlng) {
      const [lat, lng] = req.query.latlng.split(" ");
      URL += `&lat=${lat}&lon=${lng}`;
    }

    https.get(URL, (response) => {
      response.on("data", (data) => {
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

        res.render("auth/current-stat/weather-forecast-result", {
          weatherParams,
        });
      });
    });
  } else {
    res.render("auth/current-stat/weather-forecast");
  }
};

// GET "/current-stat/view-land"
const getViewLandRoute = function (req, res) {
  res.render("auth/current-stat/view-land");
};

// GET "/current-stat/crop-details"
const getCropDetailsRoute = function (req, res) {
  res.render("auth/current-stat/crop-details");
};

// GET "/settings"
const settingsRoute = function (req, res) {
  res.render("auth/settings");
};

exports.routes = {
  getIndexRoute,

  getLoginRoute,
  postLoginRoute,

  getRegisterRoute,
  postRegisterRoute,

  getHomeRoute,

  getPIRoute,
  getCSRoute,
  getFSRoute,

  getWFRoute,

  getViewLandRoute,
  getCropDetailsRoute,

  settingsRoute,
};
