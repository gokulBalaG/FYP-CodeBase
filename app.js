const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const { EXPRESS_SESSION_SECRET } = require('./config/config.js');
const { routes, middlewares } = require('./routes/routes.js');
const { User } = require('./models/model.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/views/auth']);

// Authentication setup

app.use(
  session({
    secret: EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middlewares for "/user" route

app.use('/user', middlewares.authCheck);
app.use('/user', middlewares.addNameToNav);

// Routes

app.get('/', routes.getIndex);

app.route('/login').get(routes.getLogin).post(routes.postLogin);

app.route('/register').get(routes.getRegister).post(routes.postRegister);

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
