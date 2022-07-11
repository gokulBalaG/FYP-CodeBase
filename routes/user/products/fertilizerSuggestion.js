const http = require('http');
const { config } = require('../../../config/config.js');
const { utils } = require('../../../utils/utils.js');
const { formElements } = require('./cropSuggestion.js');

// GET "user/products/fertilizer-suggestion"

exports.fertilizerSuggestion = function (req, res) {
  // get N, P & K values from form and display result
  if (req.query.n) {
    const crop_name = req.query.crop_name;
    const n = req.query.n;
    const p = req.query.p;
    const k = req.query.k;

    const url = `${config.FERTILIZER_SUGG_URL}?crop_name=${crop_name}&n=${n}&p=${p}&k=${k}`;

    http
      .get(url, response => {
        response.on('data', data => {
          res.locals.toRender['suggestions'] = JSON.parse(data);

          res.render('user/products/fertilizerSuggestion', {
            toRender: res.locals.toRender,
          });
        });
      })
      .on('error', err => {
        res.render('user/products/fertilizerSuggestion', {
          toRender: res.locals.toRender,
        });
      });

    return;
  }

  res.locals.toRender['formUrl'] = `/user/${utils.emailToUsername(
    req.user.username
  )}/products/fertilizer-suggestion`;

  res.locals.toRender['formEls'] = formElements;

  res.render('user/products/fertilizerSuggestion', {
    toRender: res.locals.toRender,
  });
};
