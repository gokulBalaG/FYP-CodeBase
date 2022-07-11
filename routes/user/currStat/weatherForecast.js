const https = require('https');
const { config } = require('../../../config/config.js');
const { utils } = require('../../../utils/utils.js');

// GET "user/current-status/weather-forecast"

exports.weatherForecast = function (req, res) {
  // check if there exist inputs, if yes then handle requests
  if (req.query.cityName || req.query.latlng) {
    let URL = config.WEATHER_API_URL;

    if (req.query.cityName !== '') {
      // when query consists of cityname
      const cityName = req.query.cityName.trim();
      URL += `&q=${cityName}`;
    } else if (req.query.latlng) {
      // when input is only lat & lng
      const [lat, lng] = req.query.latlng.split(' ');
      URL += `&lat=${lat}&lon=${lng}`;
    }

    // make get request to api
    https.get(URL, response => {
      response.on('data', data => {
        const weatherData = JSON.parse(data);

        // if err code != 200, then render city not found, go back
        if (weatherData.cod !== 200) {
          res.locals.toRender['data'] = false;
          return res.render('user/currentStatus/weatherForecast', {
            toRender: res.locals.toRender,
          });
        }

        // gather data from api
        // [table header, table data]
        const weatherParams = [
          ['Date', utils.generateDateString(new Date(weatherData.dt * 1000))],
          ['City', weatherData.name],
          ['Description', weatherData.weather[0].description],
          ['Temperature (°C)', weatherData.main.temp],
          ['Min temperature (°C)', weatherData.main.temp_min],
          ['Max temperature (°C)', weatherData.main.temp_max],
          ['Humidity (%)', weatherData.main.humidity],
          ['Wind speed (m/s)', weatherData.wind.speed],
        ];

        // render fetched data
        res.locals.toRender['weatherParams'] = weatherParams;
        res.render('user/currentStatus/weatherForecast', {
          toRender: res.locals.toRender,
        });
      });
    });

    // if no inputs then render page normally with form
  } else {
    const username = res.locals.toRender['username'];
    res.locals.toRender[
      'formUrl'
    ] = `/user/${username}/current-status/weather-forecast`;

    res.render('user/currentStatus/weatherForecast', {
      toRender: res.locals.toRender,
    });
  }
};
