require('dotenv').config();


// WEATHER API

exports.WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}`;

exports.WEATHER_API_IMG_URL = `https://openweathermap.org/img/wn/`;



// DATABASE

const dbName = 'smartAgricare';
const dbUsername = 'admin';
const dbPassword = process.env.DB_PASSWORD;

// exports.DB_URL = `mongodb+srv://${dbUsername}:${dbPassword}@smart-agricare.8ymza.mongodb.net/${dbName}?retryWrites=true&w=majority`;

exports.DB_URL = `mongodb://localhost:27017/smartAgricare`;


// AUTH

exports.EXPRESS_SESSION_SECRET='secret-stuff-for-the-nerds';