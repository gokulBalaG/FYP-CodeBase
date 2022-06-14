const _ = require('lodash');
const { utils } = require('../../../utils/utils.js');
const { model } = require('../../../model/model.js');
const { config } = require('../../../config/config.js');

const timeField = 'time';

/**
 * Returns a sorted array with fieldName values appended at the beginning of the given array
 * @param {Array} fieldNames Array of field names in sensorData
 * @param  {...any} fieldName Value(s) to be appended at the beginning of the given array
 * @returns {Array} An array with fieldName value(s) appended at the beginning of sorted fieldName array
 */

const sortAndUnshift = (fieldNames, fieldName) => {
  fieldNames = fieldNames.sort().slice(0, -1);
  fieldNames.unshift(fieldName);

  return fieldNames;
};

// GET "user/current-status/view-land"

exports.viewLand = async function (req, res) {
  const sensorDataDoc = await model.SensorData.findOne({
    email: req.user.username,
  });

  // if no data found
  if (sensorDataDoc.sensorData.length === 0)
    return res.render('user/currentStatus/viewLand', {
      toRender: res.locals.toRender,
    });

  // entire data with field names
  const data = { X: {}, Y: {} };

  // headers on table
  let tableHeaders = [
    'Temperature (°C)',
    'Humidity (%)',
    'Soil PH',
    'Rainfall (mm)',
    'Time',
  ];

  // field names as per stored in db
  // ['temperature', 'humidity', 'ph', 'rainfall', 'time']
  let fieldNames = model.sensorDataFields;

  // init data obj with X & Y fields, X will contain time and rest into Y
  fieldNames.forEach((fieldName, i) => {
    const tableHeaderName = tableHeaders[i];

    // creates object: eg:
    // soil: {
    //  fieldName: 'soil',
    //  tableHeaderName: 'Soil',
    //  values: [],
    // }
    const field = {
      fieldName,
      tableHeaderName,
      values: [],
    };

    // adding to X or Y fields
    if (fieldName === timeField) data['X'][fieldName] = field;
    else data['Y'][fieldName] = field;
  });

  // loop through data array from db
  sensorDataDoc.sensorData.forEach(doc => {
    // loop through each field name & push data into values array
    fieldNames.forEach(fieldName => {
      if (fieldName === timeField)
        data['X'][fieldName].values.push(doc[fieldName]);
      else data['Y'][fieldName].values.push(doc[fieldName]);
    });
  });

  // to sort field names and  push 'time' from end to the beginning
  tableHeaders = sortAndUnshift(tableHeaders, 'Time');
  fieldNames = sortAndUnshift(fieldNames, 'time');

  const plotConfig = utils.createPlotConfig(data);
  utils.plotGraph(plotConfig, config.PLOT_IMG);

  res.locals.toRender['imgUrl'] = '/images/view-land-plot.png';
  res.locals.toRender['tableHeaders'] = tableHeaders;
  res.locals.toRender['sensorData'] = sensorDataDoc.sensorData;
  res.locals.toRender['fieldNames'] = fieldNames;

  res.render('user/currentStatus/viewLand', { toRender: res.locals.toRender });
};
