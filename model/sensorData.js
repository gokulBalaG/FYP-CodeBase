const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataEntrySchema = new mongoose.Schema({
  rainfall: {
    type: Number,
    default: 0,
    required: true,
  },
  soilHumidity: {
    type: Number,
    default: 0,
    required: true,
  },
  soilPH: {
    type: Number,
    default: 0,
    required: true,
  },
  temperature: {
    type: Number,
    default: 0,
    required: true,
  },
  time: {
    type: String,
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
