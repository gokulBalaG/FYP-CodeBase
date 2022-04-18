const https = require('https');
const { WEATHER_API_URL, WEATHER_API_IMG_URL } = require('../config/config.js');

// GET & POST "user/current-stat/weather-forecast"

exports.getWF = function (req, res) {
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

        res.locals.toRenderObj['weatherParams'] = weatherParams;
        res.render(
          'auth/current-stat/weather-forecast-result',
          res.locals.toRenderObj
        );
      });
    });

    // else render page normally
  } else {
    res.render('auth/current-stat/weather-forecast', res.locals.toRenderObj);
  }
};
