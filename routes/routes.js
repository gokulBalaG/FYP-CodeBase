const { getIndex } = require('./woAuth.js');
const { afterAuthRoutes } = require('./afterAuth.js');
const { registerRoutes } = require('./registerRoutes.js');
const { loginRoutes } = require('./loginRoutes.js');
const { getWF } = require('./weatherForecast.js');
const { checkIfUsername } = require('./helper.js');

exports.routes = {
  ...afterAuthRoutes,
  ...registerRoutes,
  ...loginRoutes,
  getIndex,
  getWF,

  checkIfUsername,
};

const { middlewares } = require('./middlewares.js');
exports.middlewares = middlewares;
