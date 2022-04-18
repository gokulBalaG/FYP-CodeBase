const { UserData } = require('../models/model.js');

// only accessed by code
// GET "/checkIfUsername?username=<anything>"

exports.checkIfUsername = function (req, res) {
  const incomingUsername = req.query.username.trim();

  UserData.findOne({ email: incomingUsername }, function (err, foundUser) {
    if (err) console.log(err);

    if (foundUser) {
      return res.status(200).json({
        userExists: true,
      });
    } else {
      return res.status(200).json({
        userExists: false,
      });
    }
  });
};
