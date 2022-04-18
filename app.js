const { routes, middlewares } = require('./routes/routes.js');
const { initApp } = require('./config/initApp.js');

const PORT = process.env.PORT || 3000;
const app = initApp(__dirname);

app.use(middlewares.logger);

// middlewares for "/user" route
app.use('/user', middlewares.authCheck);
app.use('/user', middlewares.addNameToNav);

// Routes

app.get('/', routes.getIndex);

app
  .route('/login')
  .get(routes.getLogin)
  .post(middlewares.authenticateLogin, routes.postLogin);

app.route('/register').get(routes.getRegister).post(routes.postRegister);

// only requests from client side js
app.get('/checkIfUsername', routes.checkIfUsername);

// Routes after authentication (leading with "/user")

app.get(`/user/home`, routes.getHome);

app.get(`/user/settings`, routes.settings);

app.get(`/user/products/precision-irrigation`, routes.getPI);
app.get(`/user/products/crop-suggestion`, routes.getCS);
app.get(`/user/products/fertilizer-suggestion`, routes.getFS);

app.get(`/user/current-stat/weather-forecast`, routes.getWF);
app.get(`/user/current-stat/view-land`, routes.getViewLand);
app.get(`/user/current-stat/crop-details`, routes.getCropDetails);

app.get(`/user/logout`, routes.logout);

app.all('*', routes.all);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
