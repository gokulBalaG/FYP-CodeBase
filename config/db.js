const mongoose = require('mongoose');

/**
 * Establish DB connection
 * @param {String} DB_URL DB connection URL
 * @returns {Object} DB connection object
 */

exports.initDB = function (DB_URL) {
  if (DB_URL.includes('localhost')) console.log('***** local database *****');

  mongoose.connect(DB_URL, { useNewUrlParser: true });

  const conn = mongoose.connection;

  conn.on('connected', () => console.log('Database connected'));
  conn.on('disconnected', () => console.log('Database disconnected'));
  conn.on('error', console.error.bind(console, 'Connection error:'));

  return conn;
};
