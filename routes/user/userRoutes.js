const { homeProducts } = require('../../config/staticData.js');

// GET "user/home"
const home = function (req, res) {
  const username = res.locals.toRender['username'];

  res.locals.toRender['homeProducts'] = homeProducts;
  res.locals.toRender[
    'weatherForecastUrl'
  ] = `/user/${username}/current-status/weather-forecast`;
  res.locals.toRender[
    'viewLandUrl'
  ] = `/user/${username}/current-status/view-land`;

  res.render('user/home', { toRender: res.locals.toRender });
};

// GET "user/logout"
const logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.userRoutes = {
  home,
  logout,
};
