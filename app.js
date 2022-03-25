require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3000;
const weatherAPIKey = process.env.WEATHER_API_KEY;

app.set("view engine", "ejs");

// set multiple view paths for express
app.set("views", [__dirname + "/views", __dirname + "/views/auth"]);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// render static files when base route (after domain name or localhost) is other than "/"
// app.use("/", express.static("public")) // this is by default
// app.use(express.static("public")); // or this

// here serving the static files when the base route is "/products" & "/current-stat"
app.use("/products", express.static("public"));
app.use("/current-stat", express.static("public"));

const {
  products,
  featureIcons,
  homeProducts,
  fsFeatures,
  csFeatures,
} = require("./data.js");

//
//

// HOME ROUTE
app.get("/", (req, res) => {
  res.render("index", {
    products,
    featureIcons,
  });
});

//
//

// LOGIN ROUTE
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const [email, password] = [req.body.email, req.body.password];

  console.log(email, password);

  res.redirect("/home");
});

//
//

// REGISTER ROUTE
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const [email, password] = [req.body.email, req.body.password];

  console.log(email, password);

  res.redirect("/home");
});

//
//

// HOME ROUTE (AFTER AUTH)
app.get("/home", (req, res) => {
  res.render("auth/home", { homeProducts });
});

//
//

// PRECISION IRRIGATION (AFTER AUTH)
app.get("/products/precision-irrigation", (req, res) => {
  res.render("auth/products/precision-irrigation");
});

//
//

// CROP SUGGESTION (AFTER AUTH)
app.get("/products/crop-suggestion", (req, res) => {
  res.render("auth/products/crop-suggestion", { csFeatures });
});

//
//

// FERTILIZER SUGGESTION (AFTER AUTH)
app.get("/products/fertilizer-suggestion", (req, res) => {
  res.render("auth/products/fertilizer-suggestion", { fsFeatures });
});

//
//

// WEATHER FORECAST (AFTER AUTH)

let weatherParams = {};

app.get("/current-stat/weather-forecast", (req, res) => {
  res.render("auth/current-stat/weather-forecast");
});

app.post("/current-stat/weather-forecast", (req, res) => {
  let URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${weatherAPIKey}`;

  if (req.body.latlng) {
    const [lat, lng] = req.body.latlng.split(",");
    URL += `&lat=${lat}&lon=${lng}`;
  } else if (req.body.cityName !== "") {
    const cityName = req.body.cityName;
    URL += `&q=${cityName}`;
  }

  https.get(URL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const [temp, desc, icon] = [
        weatherData.main.temp,
        weatherData.weather[0].description,
        weatherData.weather[0].icon,
      ];

      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      weatherParams = {
        temp,
        desc,
        imgURL,
      };

      res.redirect("/current-stat/weather-forecast-result");
    });
  });
});

app.get("/current-stat/weather-forecast-result", (req, res) => {
  res.render("auth/current-stat/weather-forecast-result", { weatherParams });
});

//
//

// VIEW LAND (AFTER AUTH)
app.get("/current-stat/view-land", (req, res) => {
  res.render("auth/current-stat/view-land");
});

//
//

// CROP DETAILS (AFTER AUTH)
app.get("/current-stat/crop-details", (req, res) => {
  res.render("auth/current-stat/crop-details");
});

//
//

// Settings page

app.get("/settings", (req, res) => {
  res.render("auth/settings");
});

//
//

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
