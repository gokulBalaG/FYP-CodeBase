require('dotenv').config();

const BASE_URL = process.env.BASE_URL;
const CROP_PREDICTION_URL = process.env.CROP_PREDICTION_URL;
const FERTILIZER_SUGG_URL = process.env.FERTILIZER_SUGG_URL;

// WEATHER API

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}`;

//
//

// DATABASE

const DB_URL = process.env.DB_URL;

// const DB_URL = `mongodb://localhost:27017/smartAgricare`;

//
//

// AUTH

const EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;

const PASSWORD_MIN_LEN = 8;

//
//

// EMAIL STUFF

const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const EMAIL = process.env.EMAIL;
const EMAIL_PW = process.env.EMAIL_PW;

//
//

// PLOT IMAGE URL

const PLOT_IMG = process.env.PLOT_IMG;

//
//

const {
  welcomeSubject,
  welcomeContent,
  newLoginSubject,
  newLoginContent,
  passwordResetSubject,
  passwordResetContent,
  passwordResetSuccessSubject,
  passwordResetSuccessContent,
} = require('./staticData.js');

exports.config = {
  BASE_URL,
  CROP_PREDICTION_URL,
  FERTILIZER_SUGG_URL,

  WEATHER_API_URL,

  DB_URL,

  EXPRESS_SESSION_SECRET,
  PASSWORD_MIN_LEN,

  EMAIL,
  EMAIL_SERVICE,
  EMAIL_PW,

  PLOT_IMG,

  welcomeSubject,
  welcomeContent,
  newLoginSubject,
  newLoginContent,

  passwordResetSubject,
  passwordResetContent,
  passwordResetSuccessSubject,
  passwordResetSuccessContent,
};
