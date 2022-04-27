const mongoose = require('mongoose');
const { DB_URL } = require('./config.js');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const conn = mongoose.connection;

conn.on('connected', () => console.log('Database connected'));

conn.on('disconnected', () => console.log('Database disconnected'));

conn.on('error', console.error.bind(console, 'Connection error:'));

module.exports = conn;
