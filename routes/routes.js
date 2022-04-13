const { woAuthRoutes } = require('./woAuth.js');
const { afterAuthRoutes } = require('./afterAuth.js');
const { getWF } = require('./weatherForecast.js');
const { registerRoutes } = require('./register.js');

exports.routes = {
  ...woAuthRoutes,
  ...afterAuthRoutes,
  ...registerRoutes,
  getWF,
};

const { middlewares } = require('./middlewares.js');

exports.middlewares = middlewares;
