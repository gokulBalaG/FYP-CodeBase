const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataEntrySchema = new mongoose.Schema({
  temperature: {
    type: Number,
    default: 0,
    required: true,
  },
  humidity: {
    type: Number,
    default: 0,
    required: true,
  },
  ph: {
    type: Number,
    default: 0,
    required: true,
  },
  rainfall: {
    type: Number,
    default: 0,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

const sensorDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sensorData: [sensorDataEntrySchema],
});

exports.SensorData = new mongoose.model('sensorData', sensorDataSchema);
exports.sensorDataFields = ['temperature', 'humidity', 'ph', 'rainfall', 'time'];