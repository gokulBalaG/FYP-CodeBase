const { plot, createConfig } = require('../../utils/plotGraph.js');
const { SensorData } = require('../../model/model.js');
const { PLOT_IMG } = require('../../config/config.js');

// GET "user/current-stat/view-land"

exports.getViewLand = async function (req, res) {
  const sensorDataDoc = await SensorData.findOne({ email: req.user.username });

  if (sensorDataDoc.sensorData.length === 0)
    return res.render('auth/current-stat/view-land', {
      toRender: res.locals.toRender,
    });

  const xLabels = []; // time from doc (x axis)
  const rainVals = []; // rain value (y axis)
  const gasVals = []; // gas value (y axis)

  sensorDataDoc.sensorData.forEach(doc => {
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
  res.locals.toRender['tableHeaders'] = ['Time', 'Rain value', 'Gas value'];
  res.locals.toRender['sensorData'] = sensorDataDoc.sensorData;
  res.render('auth/current-stat/view-land', { toRender: res.locals.toRender });
};
