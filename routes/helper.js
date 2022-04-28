const { UserDetails } = require('../model/model.js');

// only accessed by code
// GET "/checkIfUsername?username=<anything>"

exports.checkIfUsername = async function (req, res) {
  const incomingUsername = req.query.username.trim();

  const foundUser = await UserDetails.findOne({ email: incomingUsername });

  if (!foundUser)
    return res.status(200).json({
      userExists: false,
    });

  return res.status(200).json({
    userExists: true,
  });
};
