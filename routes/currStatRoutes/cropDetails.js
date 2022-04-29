// GET "user/current-stat/crop-details"
exports.getCropDetails = function (req, res) {
  res.render('auth/current-stat/crop-details', res.locals.toRenderObj);
};
