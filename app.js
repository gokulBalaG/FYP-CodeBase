const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const { EXPRESS_SESSION_SECRET } = require('./src/config.js');
const { routes } = require('./src/routes.js');
const { User } = require('./src/model.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/views/auth']);

const [slash, products, currStat] = ['/', '/products', '/current-stat'];

app.use(slash, express.static('public'));
app.use(products, express.static('public'));
app.use(currStat, express.static('public'));

// auth part

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

// Routes

app.get('/', routes.getIndex);

app.route('/login').get(routes.getLogin).post(routes.postLogin);

app.route('/register').get(routes.getRegister).post(routes.postRegister);

// Routes after authentication

app.get('/home', routes.getHome);

app.get('/settings', routes.settings);

app.get(`${products}/precision-irrigation`, routes.getPI);
app.get(`${products}/crop-suggestion`, routes.getCS);
app.get(`${products}/fertilizer-suggestion`, routes.getFS);

app.get(`${currStat}/weather-forecast`, routes.getWF);
app.get(`${currStat}/view-land`, routes.getViewLand);
app.get(`${currStat}/crop-details`, routes.getCropDetails);

app.get('/logout', routes.logout);

app.all('*', routes.all);

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
