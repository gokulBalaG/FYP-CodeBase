const { getIndex, all } = require('./index.js');
const { getLogin, postLogin } = require('./loginRoutes.js');
const { getRegister, postRegister } = require('./registerRoutes.js');

// AFTER AUTHENTICATION
// "/user/<username>/*"
// user account specific
const { userRoutes } = require('./user/user/userRoutes.js');

// products
const { productRoutes } = require('./user/products/productRoutes.js');

// current stat
const { getWF } = require('./user/currStat/weatherForecast.js');
const { getViewLand } = require('./user/currStat/viewLand.js');
const { getCropDetails } = require('./user/currStat/cropDetails.js');

// utility - api endpoint for registration/login checks
const { checkIfUsername } = require('./utils/checkIfUsername.js');

const { resetPasswordRouter } = require('./utils/resetPassword.js');

exports.r = {
  getIndex,
  all,

  getLogin,
  postLogin,

  getRegister,
  postRegister,

  ...userRoutes,

  ...productRoutes,

  getWF,
  getViewLand,
  getCropDetails,

  checkIfUsername,

  resetPasswordRouter,
};
