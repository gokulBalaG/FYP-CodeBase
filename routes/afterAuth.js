const { homeProducts, fsFeatures, csFeatures } = require('../model/data.js');

// GET "user/current-stat/crop-details"
const getCropDetails = function (req, res) {
  res.render('auth/current-stat/crop-details', res.locals.toRenderObj);
};

// GET "user/home"
const getHome = function (req, res) {
  res.locals.toRenderObj['homeProducts'] = homeProducts;
  res.render('auth/home', res.locals.toRenderObj);
};

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

// GET "user/settings"
const settings = function (req, res) {
  res.render('auth/settings', res.locals.toRenderObj);
};

// GET "user/logout"
const logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

// GET "*"
const all = function (req, res) {
  res.status(404).send('<h1>Broooooo! Page not found</h1>');
};

exports.afterAuthRoutes = {
  getCropDetails,
  getHome,
  getPI,
  getCS,
  getFS,
  settings,
  logout,
  all,
};
