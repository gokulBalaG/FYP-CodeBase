const { woAuthRoutes } = require('./woAuth.js');
const { afterAuthRoutes } = require('./afterAuth.js');
const { getWF } = require('./weatherForecast.js');

exports.routes = {
  ...woAuthRoutes,
  ...afterAuthRoutes,
  getWF,
};

const { middlewares } = require('./middlewares.js');

exports.middlewares = middlewares;
