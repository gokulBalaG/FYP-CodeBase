const https = require('https');
const { config } = require('../../../config/config.js');

// GET & POST "user/current-stat/weather-forecast"

exports.weatherForecast = function (req, res) {
  // check if there exist inputs, if yes then handle requests
  if (req.query.cityName || req.query.latlng) {
    let URL = config.WEATHER_API_URL;

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

        const imgURL = config.WEATHER_API_IMG_URL + `${icon}@2x.png`;
        const weatherParams = {
          temp,
          desc,
          imgURL,
        };

        res.locals.toRender['weatherParams'] = weatherParams;

        res.render('user/current-stat/weather-forecast', {
          toRender: res.locals.toRender,
        });
      });
    });

    // else render page normally with form
  } else {
    const username = res.locals.toRender['username'];
    res.locals.toRender[
      'formUrl'
    ] = `/user/${username}/current-stat/weather-forecast`;

    res.render('user/current-stat/weather-forecast', {
      toRender: res.locals.toRender,
    });
  }
};
