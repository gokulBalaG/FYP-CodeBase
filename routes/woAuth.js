const { products, featureIcons } = require('../model/data.js');

// Route functions

// GET "/"
exports.getIndex = function (req, res) {
  res.render('index', {
    products,
    featureIcons,
  });
};
