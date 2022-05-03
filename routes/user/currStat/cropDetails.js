// GET "user/current-stat/crop-details"
exports.cropDetails = function (req, res) {
  res.render('user/current-stat/crop-details', { toRender: res.locals.toRender });
};
