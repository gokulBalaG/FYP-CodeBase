const { UserData } = require('./model.js');


const checkIfAuthThenRenderOrRedirect = function (
  req,
  res,
  toRenderPage, // page to render if authenticated
  objectsToRenderWithName = null, // [ ['nameOfObj', obj] ]
  redirectTo = '/login' // page to redirect if !authenticated
) {
  // create an object that will be used to render the page
  const toRenderObj = {};
  if (objectsToRenderWithName) {
    // loop through each pair to get name and obj and insert into renderObj
    objectsToRenderWithName.forEach(
      object => (toRenderObj[object[0]] = object[1])
    );
  }

  if (req.isAuthenticated()) {
    UserData.findOne(
      // finding the user in the UserData to get "name"
      { email: req.user.username },
      function (err, foundUserData) {
        // add the name of the user to display on the navbar
        toRenderObj['name'] = foundUserData.name;

        res.render(toRenderPage, toRenderObj);
      }
    );
  } else res.redirect(redirectTo);
};

exports.helpers = {
  checkIfAuthThenRenderOrRedirect,
};
