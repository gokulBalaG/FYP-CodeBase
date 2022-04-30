const { UserDetails, SensorData } = require('../model/model.js');
const { newLoginContent } = require('../config/staticData.js');

const emailToUsername = email => email.slice(0, email.indexOf('@'));

exports.emailToUsername = emailToUsername;

exports.initUserContent = function (email, phone) {
  // store user details
  const userDetails = new UserDetails({
    username: emailToUsername(email),
    email: email,
    phone: phone,
    verified: false,
  });
  userDetails.save();

  // initialize sensorData for user
  const sensorData = new SensorData({
    email: email,
    sensorData: [],
  });
  sensorData.save();
};

exports.generateOnLoginEmail = function () {
  const date = String(Date());
  const datePart = date.slice(0, 15);
  const time = date.slice(16, 24);
  const dateString = `${datePart} at ${time}`;

  return `${newLoginContent} <strong>${dateString}</strong>`;
};
