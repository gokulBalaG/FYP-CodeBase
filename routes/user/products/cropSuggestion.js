const http = require('http');
const { model } = require('../../../model/model.js');
const { config } = require('../../../config/config.js');
const { utils } = require('../../../utils/utils.js');

const formElements = [
  {
    id: 'n',
    upperCaseId: 'N',
    name: 'Nitrogen',
  },
  {
    id: 'p',
    upperCaseId: 'P',
    name: 'Phosphorus',
  },
  {
    id: 'k',
    upperCaseId: 'K',
    name: 'Potassium',
  },
];

/**
 * Generate a GET request URL
 * @param {String} baseUrl Base URL route to which the request will be made
 * @param {Array} paramNames Array of parameters to be fetched from obj, to generate URL
 * @param {Object} obj Object from which the values will be fetched
 * @returns {String} The URL with the parameters
 */

const generateRequestURL = (baseUrl, paramNames, obj) =>
  paramNames
    .reduce((acc, name) => `${acc}${name}=${obj[name]}&`, baseUrl + '?')
    .slice(0, -1);

/**
 * Get the average data from an array of objects
 * @param {Object} sensorData MongoDB array document
 * @returns {Object} Average sensor data from the given array of sensor data
 */

const getAvgSensorData = function (sensorData) {
  // avg the values from array
  const sensorDataArray = Array.from(sensorData);
  const len = sensorDataArray.length;

  // get all field names except for "time" from model.sensorDataFields
  const sensorDataFields = utils.filterFieldFrom(
    'time',
    model.sensorDataFields
  );

  // init avgSensorData document to 0s
  const avgSensorData = {};
  sensorDataFields.forEach(field => (avgSensorData[field] = 0.0));

  // loop through all documents in array
  sensorDataArray.forEach(doc => {
    // loop through each field in every document (except time)
    sensorDataFields.forEach(field => {
      avgSensorData[field] += doc[field] / len;
    });
  });

  return avgSensorData;
};

// GET "user/products/crop-suggestion"

exports.cropSuggestion = async function (req, res) {
  // get N, P & K values from form and display result
  if (req.query.n) {
    // fetch the sensor data array from db
    const sensorData = await model.SensorData.findOne({
      email: req.user.username,
    });

    const avgSensorData = getAvgSensorData(sensorData.sensorData);

    let url = generateRequestURL(
      config.PREDICTION_URL,
      utils.filterFieldFrom('time', model.sensorDataFields),
      avgSensorData
    );

    url += `&n=${req.query.n}&p=${req.query.p}&k=${req.query.k}`;

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

    return;
  }

  // if form elements are empty then render the form

  res.locals.toRender['formUrl'] = `/user/${utils.emailToUsername(
    req.user.username
  )}/products/crop-suggestion`;
  
  res.locals.toRender['formEls'] = formElements;

  res.render('user/products/cropSuggestion', {
    toRender: res.locals.toRender,
  });
};
