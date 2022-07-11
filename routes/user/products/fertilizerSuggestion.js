// GET "user/products/fertilizer-suggestion"

exports.fertilizerSuggestion = function (req, res) {
  res.render('user/products/fertilizerSuggestion', {
    toRender: res.locals.toRender,
  });
};
