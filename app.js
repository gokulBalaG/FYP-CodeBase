const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// / - HOME ROUTE

const { features, icons, userReviews } = require("./data.js");

app.get("/", (req, res) => {
  res.render("index", {
    features: features,
    icons: icons,
    userReviews: userReviews,
  });
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
