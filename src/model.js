const mongoose  = require('mongoose');
const dbConn = require('./database.js');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
});

const sensorsCurrDataSchema = new mongoose.Schema({
  ah: String,
  atemp: String,
  shum: String,
  ph: String,
  rain: String,
});

exports.User = new mongoose.model('user', userSchema);

exports.SensorsCurrData = new mongoose.model(
  'sensorsCurrData',
  sensorsCurrDataSchema
);
