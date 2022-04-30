const { products, featureIcons } = require('../model/data.js');

// Route functions

// GET "/"
exports.getIndex = function (req, res) {
  res.render('index', {
    products,
    featureIcons,
  });
};

// GET "*"
exports.all = function (req, res) {
  res.status(404).send('<h1>Broooooo! Page not found</h1>');
};
