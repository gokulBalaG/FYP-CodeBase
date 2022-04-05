const mongoose  = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const dbConn = require('./database.js');

// USER COLLECTION (for auth)

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

exports.User = new mongoose.model('user', userSchema);



// sensors data

const sensorsCurrDataSchema = new mongoose.Schema({
  ah: String,
  atemp: String,
  shum: String,
  ph: String,
  rain: String,
});

exports.SensorsCurrData = new mongoose.model(
  'sensorsCurrData',
  sensorsCurrDataSchema
);
