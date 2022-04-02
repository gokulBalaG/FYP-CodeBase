require('dotenv').config();

exports.WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}`;

exports.WEATHER_API_IMG_URL = `https://openweathermap.org/img/wn/`;

const dbUsername = 'test_user';

exports.DB_URL = `mongodb+srv://${dbUsername}:${process.env.DB_PASSWORD}@sensordata.4x7l6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
