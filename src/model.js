const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const dbConn = require('./database.js');

// USER COLLECTION (for auth)

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

exports.User = new mongoose.model('user', userSchema);


// USER DATA COLLECTION

const userDataSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
});

exports.UserData = new mongoose.model('UserData', userDataSchema);


// SENSOR DATA COLLECTION

const sensorsCurrDataSchema = new mongoose.Schema({
  ah: String,
  atemp: String,
  shum: String,
  ph: String,
  rain: String,
  // date format - dd-mm-yyyy hh:mm
  time: String
});

exports.SensorsCurrData = new mongoose.model(
  'sensorsCurrData',
  sensorsCurrDataSchema
);
