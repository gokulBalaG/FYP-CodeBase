const { r, mw } = require('./routes/routes.js');
const { initApp } = require('./config/initApp.js');

const PORT = process.env.PORT || 3000;
const app = initApp(__dirname);

app.use(mw.logger);

// middlewares for "/user" route
app.use('/user', mw.authCheck);
app.use('/user', mw.addNameToNav);

// Routes

app.get('/', r.getIndex);

app
  .route('/login')
  .get(r.getLogin)
  .post(mw.verifyLogin, r.postLogin);

app.route('/register').get(r.getRegister).post(r.postRegister);

// only requests from client side js
app.get('/checkIfUsername', r.checkIfUsername);

// Routes after authentication (leading with "/user")

app.get(`/user/home`, r.getHome);

// app.get(`/user/settings`, r.settings);

// app.get(`/user/products/precision-irrigation`, r.getPI);
// app.get(`/user/products/crop-suggestion`, r.getCS);
// app.get(`/user/products/fertilizer-suggestion`, r.getFS);

app.get(`/user/current-stat/weather-forecast`, r.getWF);
app.get(`/user/current-stat/view-land`, r.getViewLand);
// app.get(`/user/current-stat/crop-details`, r.getCropDetails);

app.get(`/user/logout`, r.logout);

app.all('*', r.all);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
