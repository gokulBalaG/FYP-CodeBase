const { fsFeatures, csFeatures } = require('../../model/data.js');

// GET "user/products/precision-irrigation"
const getPI = function (req, res) {
  res.render('auth/products/precision-irrigation', { toRender: res.locals.toRender });
};

// GET "user/products/crop-suggestion"
const getCS = function (req, res) {
  res.locals.toRender['csFeatures'] = csFeatures;

  res.render('auth/products/crop-suggestion', {
    toRender: res.locals.toRender,
  });
};

// GET "user/products/fertilizer-suggestion"
const getFS = function (req, res) {
  res.locals.toRender['fsFeatures'] = fsFeatures;

  res.render('auth/products/fertilizer-suggestion', {
    toRender: res.locals.toRender,
  });
};

exports.productRoutes = {
  getPI,
  getCS,
  getFS,
};
