const { model } = require('../../model/model.js');

// checks if the username exists in the db
// only accessed by code
// GET "/checkIfUsername?email=<anything>"

exports.checkIfUsername = async function (req, res) {
  const incomingEmail = req.query.email;

  const foundUser = await model.User.findOne({ username: incomingEmail });

  if (!foundUser)
    return res.status(200).json({
      userExists: false,
    });

  return res.status(200).json({
    userExists: true,
  });
};
