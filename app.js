const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const { products, featureIcons, homeProducts } = require("./data.js");

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
app.get("/precisionIrrigation", (req, res) => {
  res.render("precisionIrrigation");
});

//
//

// CROP SUGGESTION (AFTER AUTH)
app.get("/cropSuggestion", (req, res) => {
  res.render("cropSuggestion");
});

//
//

// FERTILIZER SUGGESTION (AFTER AUTH)
app.get("/fertilizerSuggestion", (req, res) => {
  res.render("fertilizerSuggestion");
});

//
//

// SERVER RUNNING
app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
