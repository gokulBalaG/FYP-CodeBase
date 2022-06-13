const { model } = require('../model/model.js');

/**
 * Email to username, eg: example@email.com -> example
 * @param {String} email input email
 * @returns {String}
 */

const emailToUsername = email => email.slice(0, email.indexOf('@'));

/**
 * Initialize the content for a new user in the db
 * @param {String} email User email to init the db
 * @param {String} phone User phone number
 */

const initUserContent = function (email, phone) {
  // store user details
  const userDetails = new model.UserDetails({
    username: emailToUsername(email),
    email: email,
    phone: phone,
  });
  userDetails.save();

  // initialize sensorData for user
  const sensorData = new model.SensorData({
    email: email,
    sensorData: [],
  });
  sensorData.save();
};

/**
 * Format date using date object
 * @param {Object} dateObj Input date object
 * @returns {String} The formatted date, to format: Mon Jun 13 2022 at 15:15:16
 */

const generateDateString = function (dateObj = Date()) {
  const date = String(dateObj);
  const datePart = date.slice(0, 15);
  const time = date.slice(16, 24);
  return `${datePart} at ${time}`;
};

/**
 * Filter the MongoDB document by removing the given field
 * @param {Array} fieldNames Array of field names in sensorData/any array
 * @returns {Array} Array of field names without given field
 */

const filterFieldFrom = (field, fieldNames) =>
  Array.from(fieldNames).filter(fieldName => fieldName !== field);

const { sendEmail } = require('./sendEmail.js');
const { createPlotConfig, plotGraph } = require('./plotGraph.js');

exports.utils = {
  emailToUsername,

  initUserContent,
  generateDateString,

  filterFieldFrom,

  sendEmail,
  createPlotConfig,
  plotGraph,
};
