const { getIndex, all } = require('./index.js');
const { getLogin, postLogin } = require('./loginRoutes.js');
const { getRegister, postRegister } = require('./registerRoutes.js');

// AFTER AUTHENTICATION
// "/user/<username>/*"
// user account specific
const { userRoutes } = require('./userRoutes/userRoutes.js');

// products
const { productRoutes } = require('./productRoutes/productRoutes.js');

// current stat
const { getWF } = require('./currStatRoutes/weatherForecast.js');
const { getViewLand } = require('./currStatRoutes/viewLand.js');
const { getCropDetails } = require('./currStatRoutes/cropDetails.js');

// utility - api endpoint for registration/login checks
const { checkIfUsername } = require('./checkIfUsername.js');

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
};
