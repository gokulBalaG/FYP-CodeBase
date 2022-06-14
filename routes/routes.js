const { slash, all } = require('./index.js');
const { login, postLogin } = require('./loginRoutes.js');
const { register, postRegister } = require('./registerRoutes.js');

// AFTER AUTHENTICATION
// "/user/<username>/*"
// user account specific
const { userRoutes } = require('./user/user/userRoutes.js');

// products
const { productRoutes } = require('./user/products/productRoutes.js');
const { cropSuggestion } = require('./user/products/cropSuggestion.js');

// current stat
const { weatherForecast } = require('./user/currStat/weatherForecast.js');
const { viewLand } = require('./user/currStat/viewLand.js');
const { cropDetails } = require('./user/currStat/cropDetails.js');

// utility - api endpoint for registration/login checks
const { checkIfUsername } = require('./utils/checkIfUsername.js');

exports.r = {
  slash,
  all,

  login,
  postLogin,

  register,
  postRegister,

  ...userRoutes,

  ...productRoutes,
  cropSuggestion,

  weatherForecast,
  viewLand,
  cropDetails,

  checkIfUsername,
};
