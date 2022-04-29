const { homeProducts } = require('../../model/data.js');

// GET "user/home"
const getHome = function (req, res) {
  res.locals.toRenderObj['homeProducts'] = homeProducts;
  res.render('auth/home', res.locals.toRenderObj);
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

exports.userRoutes = {
  getHome,
  settings,
  logout,
};
