const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", [__dirname + "/views", __dirname + "/views/auth"]);
app.use("/products", express.static("public"));
app.use("/current-stat", express.static("public"));

const {
  products,
  featureIcons,
  homeProducts,
  fsFeatures,
  csFeatures,
} = require("./src/data.js");

const { getWeather } = require("./src/exports.js");

// INDEX ROUTE
app.get("/", (req, res) => {
  res.render("index", {
    products,
    featureIcons,
  });
});

// LOGIN ROUTE
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect("/home");
});

// REGISTER ROUTE
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const [email, password] = [req.body.email.trim(), req.body.password.trim()];

  console.log(email, password);

  res.redirect("/home");
});

// HOME ROUTE (AFTER AUTH)
app.get("/home", (req, res) => {
  res.render("auth/home", { homeProducts });
});

// PRECISION IRRIGATION (AFTER AUTH)
app.get("/products/precision-irrigation", (req, res) => {
  res.render("auth/products/precision-irrigation");
});

// CROP SUGGESTION (AFTER AUTH)
app.get("/products/crop-suggestion", (req, res) => {
  res.render("auth/products/crop-suggestion", { csFeatures });
});

// FERTILIZER SUGGESTION (AFTER AUTH)
app.get("/products/fertilizer-suggestion", (req, res) => {
  res.render("auth/products/fertilizer-suggestion", { fsFeatures });
});

// WEATHER FORECAST (AFTER AUTH)
app.get("/current-stat/weather-forecast", (req, res) => {
  res.render("auth/current-stat/weather-forecast");
});

app.post("/current-stat/weather-forecast", getWeather);

// VIEW LAND (AFTER AUTH)
app.get("/current-stat/view-land", (req, res) => {
  res.render("auth/current-stat/view-land");
});

// CROP DETAILS (AFTER AUTH)
app.get("/current-stat/crop-details", (req, res) => {
  res.render("auth/current-stat/crop-details");
});

// SETTINGS PAGE (AFTER AUTH)
app.get("/settings", (req, res) => {
  res.render("auth/settings");
});

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
