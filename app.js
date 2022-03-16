require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");

const app = express();
const PORT = 3000;
const apiKey = process.env.API_KEY;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {
  products,
  featureIcons,
  homeProducts,
  fsFeatures,
  csFeatures,
} = require("./data.js");
const req = require("express/lib/request");

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
  res.render("home", { homeProducts });
});

//
//

// PRECISION IRRIGATION (AFTER AUTH)
app.get("/precision-irrigation", (req, res) => {
  res.render("precision-irrigation");
});

//
//

// CROP SUGGESTION (AFTER AUTH)
app.get("/crop-suggestion", (req, res) => {
  res.render("crop-suggestion", { csFeatures });
});

//
//

// FERTILIZER SUGGESTION (AFTER AUTH)
app.get("/fertilizer-suggestion", (req, res) => {
  res.render("fertilizer-suggestion", { fsFeatures });
});

//
//

// WEATHER FORECAST
let weatherParams = { temp: "", desc: "", imgURL: "", unhide: "hidden" };

app.get("/weather-forecast", (req, res) => {
  res.render("weather-forecast", { weatherParams });
});

app.post("/weather-forecast", (req, res) => {
  const [lat, lng] = req.body.latlng.split(",");

  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

  https.get(URL, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);

      const [temp, desc, icon] = [
        weatherData.main.temp,
        weatherData.weather[0].description,
        weatherData.weather[0].icon,
      ];

      const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      let unhide = "";
      weatherParams = {
        temp,
        desc,
        imgURL,
        unhide,
      };

      unhide = 'hidden';

      res.redirect("/weather-forecast");
    });
  });
});

//
//

// VIEW LAND
app.get("/view-land", (req, res) => {
  res.render("view-land");
});

//
//

// HARDWARE STATUS
app.get("/hardware-stat", (req, res) => {
  res.render("hardware-stat");
});

//
//

// CROP DETAILS
app.get("/crop-details", (req, res) => {
  res.render("crop-details");
});

//
//

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
