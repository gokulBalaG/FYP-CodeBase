const mongoose = require('mongoose');
const { DB_URL } = require('./config.js');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const conn = mongoose.connection;

conn.on('connected', function () {
  console.log('database is connected successfully');
});

conn.on('disconnected', function () {
  console.log('database is disconnected successfully');
});

conn.on('error', console.error.bind(console, 'connection error:'));

module.exports = conn;
