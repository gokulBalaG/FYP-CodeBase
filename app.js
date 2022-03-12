const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { products, featureIcons } = require("./data.js");

// HOME ROUTE
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

// REGISTER ROUTE
app.get("/register", (req, res) => {
  res.render("register");
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
