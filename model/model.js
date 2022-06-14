const { User } = require('./user.js');
const { UserDetails } = require('./userDetails.js');
const { SensorData, sensorDataFields } = require('./sensorData.js');
const { Token } = require('./token.js');

exports.model = {
  User,
  UserDetails,
  SensorData,
  sensorDataFields,
  Token,
};
