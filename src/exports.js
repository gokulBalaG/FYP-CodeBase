require("dotenv").config();
const https = require("https");

const weatherAPIKey = process.env.WEATHER_API_KEY;

// post req on weather-forecast route
exports.getWeather = function (req, res) {
  let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weatherAPIKey}`;

  if (req.body.cityName !== "") {
    const cityName = req.body.cityName.trim();
    URL += `&q=${cityName}`;
  } else if (req.body.latlng) {
    const [lat, lng] = req.body.latlng.split(",");
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

      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

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
};
