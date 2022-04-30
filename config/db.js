const mongoose = require('mongoose');

exports.initDB = function (DB_URL) {
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
  });

  const conn = mongoose.connection;

  conn.on('connected', () => console.log('Database connected'));

  conn.on('disconnected', () => console.log('Database disconnected'));

  conn.on('error', console.error.bind(console, 'Connection error:'));

  if (DB_URL.includes('localhost')) console.log('local database');

  return conn;
};
