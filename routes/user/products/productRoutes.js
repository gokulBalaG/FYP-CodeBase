// GET "user/products/precision-irrigation"
const precisionIrrigation = function (req, res) {
  res.render('user/products/precisionIrrigation', {
    toRender: res.locals.toRender,
  });
};

// GET "user/products/fertilizer-suggestion"
const { fsFeatures } = require('../../../config/staticData.js');

const fertilizerSuggestion = function (req, res) {
  res.locals.toRender['fsFeatures'] = fsFeatures;

  res.render('user/products/fertilizerSuggestion', {
    toRender: res.locals.toRender,
  });
};

exports.productRoutes = {
  precisionIrrigation,
  fertilizerSuggestion,
};
