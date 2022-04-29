const { fsFeatures, csFeatures } = require('../../model/data.js');

// GET "user/products/precision-irrigation"
const getPI = function (req, res) {
  res.render('auth/products/precision-irrigation', res.locals.toRenderObj);
};

// GET "user/products/crop-suggestion"
const getCS = function (req, res) {
  res.locals.toRenderObj['csFeatures'] = csFeatures;
  res.render('auth/products/crop-suggestion', res.locals.toRenderObj);
};

// GET "user/products/fertilizer-suggestion"
const getFS = function (req, res) {
  res.locals.toRenderObj['fsFeatures'] = fsFeatures;
  res.render('auth/products/fertilizer-suggestion', res.locals.toRenderObj);
};

exports.productRoutes = {
  getPI,
  getCS,
  getFS,
};
