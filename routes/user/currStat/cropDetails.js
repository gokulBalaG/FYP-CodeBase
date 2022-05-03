// GET "user/currentStatus/crop-details"
exports.cropDetails = function (req, res) {
  res.render('user/currentStatus/cropDetails', { toRender: res.locals.toRender });
};
