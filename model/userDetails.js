const mongoose = require('mongoose');

// USER DETAILS COLLECTION

const userDetailsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

exports.UserDetails = new mongoose.model('userDetails', userDetailsSchema);
