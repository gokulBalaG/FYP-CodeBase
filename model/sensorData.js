const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataSchema = new mongoose.Schema({
  rainVal: Number,
  gasVal: Number,
  when: String,
  // date format - "dd-mm-yyyy hh:mm"
});

exports.SensorData = new mongoose.model('sensorData', sensorDataSchema);
