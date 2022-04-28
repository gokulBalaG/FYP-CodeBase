const { getIndex } = require('./woAuth.js');
const { afterAuthRoutes } = require('./afterAuth.js');
const { registerRoutes } = require('./registerRoutes.js');
const { loginRoutes } = require('./loginRoutes.js');
const { getWF } = require('./weatherForecast.js');
const { checkIfUsername } = require('./helper.js');
const { getViewLand } = require('./viewLand.js');

exports.r = {
  ...afterAuthRoutes,
  ...registerRoutes,
  ...loginRoutes,
  getIndex,
  getWF,
  getViewLand,

  checkIfUsername,
};

const { middlewares } = require('./middlewares.js');
exports.mw = middlewares;
