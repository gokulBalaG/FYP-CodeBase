const _ = require('lodash');
const { utils } = require('../../../utils/utils.js');
const { model } = require('../../../model/model.js');
const { config } = require('../../../config/config.js');

const timeField = 'time';

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

  // get all field names except _id
  const fieldNames = utils.filterIDkey(
    Object.keys(sensorDataDoc.sensorData[0]['_doc'])
  );

  // entire data with field names
  const data = { X: {}, Y: {} };

  // headers on table (field names converted to sentence case)
  let tableHeaders = [];
  // field names as per stored in db
  let sensorDataFields = [];

  // init data obj with X & Y fields, X will contain time and rest into Y
  fieldNames.forEach(fieldName => {
    const tableHeaderName = _.startCase(fieldName);

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

    tableHeaders.push(tableHeaderName);
    sensorDataFields.push(fieldName);
  });

  // loop through data from db
  sensorDataDoc.sensorData.forEach(doc => {
    // get field names from each document except _id
    const fieldNames = utils.filterIDkey(Object.keys(doc['_doc']));

    // loop through each field name & push data into values array
    fieldNames.forEach(fieldName => {
      if (fieldName === timeField)
        data['X'][fieldName].values.push(doc[fieldName]);
      else data['Y'][fieldName].values.push(doc[fieldName]);
    });
  });

  // to sort field names and  push 'time' to the beginning
  tableHeaders = utils.sortAndUnshift(tableHeaders, 'Time');
  sensorDataFields = utils.sortAndUnshift(sensorDataFields, 'time');

  const plotConfig = utils.createPlotConfig(data);
  utils.plotGraph(plotConfig, config.PLOT_IMG);

  res.locals.toRender['imgUrl'] = '/images/view-land-plot.png';
  res.locals.toRender['tableHeaders'] = tableHeaders;
  res.locals.toRender['sensorData'] = sensorDataDoc.sensorData;
  res.locals.toRender['sensorDataFields'] = sensorDataFields;

  res.render('user/currentStatus/viewLand', { toRender: res.locals.toRender });
};
