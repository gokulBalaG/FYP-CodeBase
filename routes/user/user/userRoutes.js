const { homeProducts } = require('../../../model/data.js');
const { utils } = require('../../../utils/utils.js');

// GET "user/home"
const home = function (req, res) {
  const username = res.locals.toRender['username'];

  res.locals.toRender['homeProducts'] = homeProducts;
  res.locals.toRender[
    'weatherForecastUrl'
  ] = `/user/${username}/current-stat/weather-forecast`;
  res.locals.toRender[
    'viewLandUrl'
  ] = `/user/${username}/current-stat/view-land`;
  res.locals.toRender[
    'cropDetailsUrl'
  ] = `/user/${username}/current-stat/crop-details`;

  res.render('user/user/home', { toRender: res.locals.toRender });
};

// GET "user/settings"
const settings = function (req, res) {
  res.render('user/user/settings', { toRender: res.locals.toRender });
};

// GET "user/logout"
const logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.userRoutes = {
  home,
  settings,
  logout,
};
