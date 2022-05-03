const { r } = require('./routes/routes.js');
const { routers } = require('./routes/routers/routers.js');
const { mw } = require('./middleware/middleware.js');
const { initApp } = require('./config/initApp.js');

const PORT = process.env.PORT || 3000;
const app = initApp(__dirname);

app.use(mw.logger);

// middlewares for "/user" route
app.use('/user', mw.authCheck);
app.use('/user', mw.addNameToNav);

// "/reset-password" router plugin
app.use('/reset-password', routers.resetPasswordRouter);

// Routes

app.get('/', r.slash);

app.route('/login').get(r.login).post(mw.verifyLogin, r.postLogin);

app.route('/register').get(r.register).post(r.postRegister);

// Routes after authentication (leading with "/user")

app.get(`/user/:username/home`, r.home);

app.get(`/user/:username/settings`, r.settings);

app.get(`/user/:username/products/precision-irrigation`, r.precisionIrrigation);
app.get(`/user/:username/products/crop-suggestion`, r.cropSuggestion);
app.get(`/user/:username/products/fertilizer-suggestion`, r.fertilizerSuggestion);

app.get(`/user/:username/current-stat/weather-forecast`, r.weatherForecast);
app.get(`/user/:username/current-stat/view-land`, r.viewLand);
app.get(`/user/:username/current-stat/crop-details`, r.cropDetails);

app.get(`/user/:username/logout`, r.logout);

// only requests from client side js
app.get(`/checkIfUsername`, r.checkIfUsername);

app.all('*', r.all);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
