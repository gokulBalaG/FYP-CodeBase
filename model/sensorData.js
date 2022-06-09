const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sensorData: [
    {
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
      airTemp: {
        type: Number,
        default: 0,
        required: true,
      },
      airHumidity: {
        type: Number,
        default: 0,
        required: true,
      },
      rainValue: {
        type: Number,
        default: 0,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
  avgSensorData: {
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
    airTemp: {
      type: Number,
      default: 0,
      required: true,
    },
    airHumidity: {
      type: Number,
      default: 0,
      required: true,
    },
    rainValue: {
      type: Number,
      default: 0,
      required: true,
    },
  },
});

exports.SensorData = new mongoose.model('sensorData', sensorDataSchema);
