const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataSchema = new mongoose.Schema({
  ah: String,
  atemp: String,
  shum: String,
  ph: String,
  rain: String,
  // date format - dd-mm-yyyy hh:mm
  time: String,
});

exports.SensorData = new mongoose.model('sensorData', sensorDataSchema);
