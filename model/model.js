const dbConn = require('../config/db.js');

const { User } = require('./user.js');
const { UserDetails } = require('./userDetails.js');
const { SensorData } = require('./sensorData.js');

exports.User = User;
exports.UserDetails = UserDetails;
exports.SensorData = SensorData;
