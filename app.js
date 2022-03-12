const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// / - HOME ROUTE

const { products, featureIcons } = require("./data.js");

app.get("/", (req, res) => {
  res.render("index", {
    products,
    featureIcons,
  });
});

// SIGNUP ROUTE

app.get("/signup", (req, res) => {
  res.render("signup");
});

// HOME ROUTE AFTER LOGIN

app.post("/home", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);

  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
