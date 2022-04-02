const express = require('express');
const bodyParser = require('body-parser');
const { routes } = require('./src/routes.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/views', __dirname + '/views/auth']);

const [products, currStat] = ['/products', '/current-stat'];

app.use(express.static('public'));
app.use(products, express.static('public'));
app.use(currStat, express.static('public'));

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

app.all('*', routes.all);

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
