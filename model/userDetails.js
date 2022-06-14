const mongoose = require('mongoose');

// USER DETAILS COLLECTION

const userDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

exports.UserDetails = new mongoose.model('userDetails', userDetailsSchema);
