const { r } = require('./routes/routes.js');
const { mw } = require('./middleware/middleware.js');
const { initApp } = require('./config/initApp.js');

const PORT = process.env.PORT || 3000;
const app = initApp(__dirname);

app.use(mw.logger);

// middlewares for "/user" route
app.use('/user', mw.authCheck);
app.use('/user', mw.addNameToNav);

// Routes

app.get('/', r.getIndex);

app.route('/login').get(r.getLogin).post(mw.verifyLogin, r.postLogin);

app.route('/register').get(r.getRegister).post(r.postRegister);

// only requests from client side js
app.get('/checkIfUsername', r.checkIfUsername);

// Routes after authentication (leading with "/user")

app.get(`/user/:username/home`, r.getHome);

// app.get(`/user/:username/settings`, r.settings);

// app.get(`/user/:username/products/precision-irrigation`, r.getPI);
// app.get(`/user/:username/products/crop-suggestion`, r.getCS);
// app.get(`/user/:username/products/fertilizer-suggestion`, r.getFS);

app.get(`/user/:username/current-stat/weather-forecast`, r.getWF);
app.get(`/user/:username/current-stat/view-land`, r.getViewLand);
// app.get(`/user/:username/current-stat/crop-details`, r.getCropDetails);

app.get(`/user/:username/logout`, r.logout);

app.all('*', r.all);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`));
