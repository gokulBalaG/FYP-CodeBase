const { products, featureIcons } = require('../config/staticData.js');

// Route functions

// GET "/"
exports.slash = function (req, res) {
  const toRender = {
    featureIcons: featureIcons,
    products: products,
    loginUrl: '/login',
    registerUrl: '/register',
  };

  res.render('index', { toRender });
};

// GET "*"
exports.all = function (req, res) {
  res.status(404).send('<h1>Broooooo! Page not found</h1>');
};
