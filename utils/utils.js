const { UserData } = require('../models/model.js');

// loop through each pair to get name and obj and insert into renderObj
const addObjsToRender = function (toRenderObj, objsToAddWithName) {
  objsToAddWithName.forEach(obj => (toRenderObj[obj[0]] = obj[1]));
  return toRenderObj;
};

// add username in navbar and render page
const addNameAndRender = function (req, res, toRenderPage, toRenderObj) {
  UserData.findOne(
    // finding the user in the UserData to get "name"
    { email: req.user.username },
    function (err, foundUserData) {
      // add the name of the user to display on the navbar
      toRenderObj['name'] = foundUserData.name;
      res.render(toRenderPage, toRenderObj);
    }
  );
};

// combining (checkIfAuth, addObjectsToRender & addNameNavbar)
const checkIfAuthThenRenderOrRedirect = function (
  req,
  res,
  toRenderPage, // page to render if authenticated
  objectsToRenderWithName = null, // [ ['nameOfObj', obj] ]
  redirectTo = '/login' // page to redirect if !authenticated
) {
  // create an object that will be used to render the page
  let toRenderObj = {};

  if (objectsToRenderWithName)
    toRenderObj = addObjsToRender(toRenderObj, objectsToRenderWithName);

  if (req.isAuthenticated())
    addNameAndRender(req, res, toRenderPage, toRenderObj);
  else res.redirect(redirectTo);
};

exports.helpers = {
  checkIfAuthThenRenderOrRedirect,
  addObjsToRender,
  addNameAndRender,
};
