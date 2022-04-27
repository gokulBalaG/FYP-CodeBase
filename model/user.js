const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// USER COLLECTION (for auth)

const userSchema = new mongoose.Schema({
  // username is the email
  username: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);

exports.User = new mongoose.model('user', userSchema);
