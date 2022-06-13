const http = require('http');
const { csFeatures } = require('../../../model/data.js');
const { model } = require('../../../model/model.js');
const { config } = require('../../../config/config.js');

const generateRequestURL = function (baseUrl, paramNames, obj) {
  const url = paramNames.reduce(
    (acc, name) => `${acc}${name}=${obj[name]}&`,
    baseUrl + '?'
  );

  return url.slice(0, -1);
};

const getAvgSensorData = function (sensorData) {
  // avg the values from array
  const sensorDataArray = Array.from(sensorData.sensorData);
  const len = sensorDataArray.length;

  // init document to avg values
  const avgSensorData = {
    rainfall: 0.0,
    soilHumidity: 0.0,
    soilPH: 0.0,
    temperature: 0.0,
  };

  sensorDataArray.forEach(doc => {
    avgSensorData.rainfall += doc.rainfall / len;
    avgSensorData.soilHumidity += doc.soilHumidity / len;
    avgSensorData.soilPH += doc.soilPH / len;
    avgSensorData.temperature += doc.temperature / len;
  });

  return avgSensorData;
};

// GET "user/products/crop-suggestion"

exports.cropSuggestion = async function (req, res) {
  // fetch the sensor data array from db
  const sensorData = await model.SensorData.findOne({
    email: req.user.username,
  });

  const avgSensorData = getAvgSensorData(sensorData);
  const url = generateRequestURL(
    config.PREDICTION_URL,
    ['rainfall', 'soilHumidity', 'soilPH', 'temperature'],
    avgSensorData
  );

  res.locals.toRender['csFeatures'] = csFeatures;

  http
    .get(url, response => {
      response.on('data', data => {
        const prediction = JSON.parse(data);

        res.locals.toRender['prediction'] = prediction;
        res.render('user/products/cropSuggestion', {
          toRender: res.locals.toRender,
        });
      });
    })
    .on('error', err => {
      res.render('user/products/cropSuggestion', {
        toRender: res.locals.toRender,
      });
    });
};
