const fs = require('fs');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 700,
  height: 400,
  backgroundColour: '#ffffff',
});

exports.createConfig = function (xLabels, y1, y1Label, y2, y2Label) {
  return {
    type: 'line',
    data: {
      labels: xLabels,
      datasets: [
        {
          label: y1Label,
          data: y1,
          fill: false,
          borderColor: ['rgb(51, 204, 204)'],
          borderWidth: 2,
          xAxisID: 'xAxis1',
        },
        {
          label: y2Label,
          data: y2,
          fill: false,
          borderColor: ['rgb(255, 102, 255)'],
          borderWidth: 2,
          xAxisID: 'xAxis1',
        },
      ],
    },
  };
};

exports.plot = async function (configuration, filePath) {
  const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
  const base64Image = dataUrl;

  const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');

  fs.writeFile(filePath, base64Data, 'base64', function (err) {
    if (err) console.log(err);
  });

  return dataUrl;
};
