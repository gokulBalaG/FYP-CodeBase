const { plot, createConfig } = require('../utils/plotGraph.js');
const { SensorData } = require('../model/sensorData.js');

// GET "user/current-stat/view-land"

exports.getViewLand = async function (req, res) {
  const docs = await SensorData.find();

  if (!docs) return console.log('no docs found');

  const xLabels = []; // time from doc (x axis)
  const rainVals = []; // rain value (y axis)
  const gasVals = []; // gas value (y axis)

  docs.forEach(d => {
    xLabels.push(d.when);
    rainVals.push(d.rainVal);
    gasVals.push(d.gasVal);
  });

  const config = createConfig(
    xLabels,
    rainVals,
    'rain value',
    gasVals,
    'gas value'
  );

  plot(config, 'public/images/view-land-plot.png');

  res.locals.toRenderObj['labels'] = ['Time', 'rain value', 'gas value'];
  res.locals.toRenderObj['docs'] = docs;
  res.render('auth/current-stat/view-land', res.locals.toRenderObj);
};
