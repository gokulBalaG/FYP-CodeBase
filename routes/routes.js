const { slash, all } = require('./index.js');
const { login, postLogin } = require('./loginRoutes.js');
const { register, postRegister } = require('./registerRoutes.js');

// AFTER AUTHENTICATION
// "/user/<username>/*"
// user account specific
const { userRoutes } = require('./user/userRoutes.js');

// products
const {
  fertilizerSuggestion,
} = require('./user/products/fertilizerSuggestion.js');

const { cropSuggestion } = require('./user/products/cropSuggestion.js');

// current stat
const { weatherForecast } = require('./user/currStat/weatherForecast.js');

const { viewLand } = require('./user/currStat/viewLand.js');

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

  fertilizerSuggestion,
  cropSuggestion,

  weatherForecast,
  viewLand,

  checkIfUsername,
};
