const mongoose = require('mongoose');

// USER DETAILS COLLECTION

const userDetailsSchema = new mongoose.Schema({
  // email prefix
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

exports.UserDetails = new mongoose.model('userDetails', userDetailsSchema);
