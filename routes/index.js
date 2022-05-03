const { products, featureIcons } = require('../model/data.js');

// Route functions

// GET "/"
exports.slash = function (req, res) {
  const toRender = {
    products: products,
    featureIcons: featureIcons,
    loginUrl: '/login',
    registerUrl: '/register',
  };

  res.render('index', { toRender });
};

// GET "*"
exports.all = function (req, res) {
  res.status(404).send('<h1>Broooooo! Page not found</h1>');
};
