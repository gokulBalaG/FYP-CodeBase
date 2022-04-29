require('dotenv').config();

// WEATHER API

exports.WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}`;

exports.WEATHER_API_IMG_URL = `https://openweathermap.org/img/wn/`;

//
//

// DATABASE

const dbName = process.env.DB_NAME;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

// exports.DB_URL = `mongodb+srv://${dbUsername}:${dbPassword}@smart-agricare.8ymza.mongodb.net/${dbName}?retryWrites=true&w=majority`;

exports.DB_URL = `mongodb://localhost:27017/${dbName}`;

//
//

// AUTH

exports.EXPRESS_SESSION_SECRET = process.env.EXPRESS_SESSION_SECRET;
exports.PASSWORD_MIN_LEN = 8;

//
//

// EMAIL STUFF

exports.EMAIL_SERVICE = process.env.EMAIL_SERVICE;
exports.EMAIL = process.env.EMAIL;
exports.EMAIL_PW = process.env.EMAIL_PW;

// 
// 

// PLOT IMAGE URL

exports.PLOT_IMG = process.env.PLOT_IMG;