const mongoose = require('mongoose');

// SENSOR DATA COLLECTION

const sensorDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  sensorData: [
    {
      rainVal: {
        type: Number,
        required: true,
      },
      gasVal: {
        type: Number,
        required: true,
      },
      when: {
        type: String,
        required: true,
      },
    },
  ],
});

exports.SensorData = new mongoose.model('sensorData', sensorDataSchema);
