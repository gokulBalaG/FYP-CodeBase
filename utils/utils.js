const { model } = require('../model/model.js');
const { config } = require('../config/config.js');

const emailToUsername = email => email.slice(0, email.indexOf('@'));

const initUserContent = function (email, phone) {
  // store user details
  const userDetails = new model.UserDetails({
    username: emailToUsername(email),
    email: email,
    phone: phone,
    verified: false,
  });
  userDetails.save();

  // initialize sensorData for user
  const sensorData = new model.SensorData({
    email: email,
    sensorData: [],
  });
  sensorData.save();
};

const generateOnLoginEmail = function () {
  const date = String(Date());
  const datePart = date.slice(0, 15);
  const time = date.slice(16, 24);
  const dateString = `${datePart} at ${time}`;

  return `${config.newLoginContent} <strong>${dateString}</strong>`;
};

const { sendEmail } = require('./sendEmail.js');
const { createPlotConfig, plotGraph } = require('./plotGraph.js');

exports.utils = {
  emailToUsername,

  initUserContent,
  generateOnLoginEmail,
  sendEmail,

  createPlotConfig,
  plotGraph,
};
