const { plot, createConfig } = require('../utils/plotGraph.js');
const { SensorData } = require('../model/sensorData.js');
const { PLOT_IMG } = require('../config/config.js');

// GET "user/current-stat/view-land"

exports.getViewLand = async function (req, res) {
  const sensorDataDocs = await SensorData.find();

  if (!sensorDataDocs) return console.log('no sensorDataDocs found');

  const xLabels = []; // time from doc (x axis)
  const rainVals = []; // rain value (y axis)
  const gasVals = []; // gas value (y axis)

  sensorDataDocs.forEach(doc => {
    xLabels.push(doc.when);
    rainVals.push(doc.rainVal);
    gasVals.push(doc.gasVal);
  });

  const config = createConfig(
    xLabels,
    rainVals,
    'Rain value',
    gasVals,
    'Gas value'
  );

  plot(config, PLOT_IMG);

  // for rendering table - labels
  res.locals.toRenderObj['tableHeaders'] = ['Time', 'Rain value', 'Gas value'];
  res.locals.toRenderObj['sensorDataDocs'] = sensorDataDocs;
  res.render('auth/current-stat/view-land', res.locals.toRenderObj);
};
