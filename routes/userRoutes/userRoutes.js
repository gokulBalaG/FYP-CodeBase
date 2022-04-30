const { homeProducts } = require('../../model/data.js');

// GET "user/home"
const getHome = function (req, res) {
  res.locals.toRender['homeProducts'] = homeProducts;
  res.render('auth/home', { toRender: res.locals.toRender });
};

// GET "user/settings"
const settings = function (req, res) {
  res.render('auth/settings', { toRender: res.locals.toRender });
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
