const express = require("express");
const bodyParser = require("body-parser");
const { routes } = require("./src/routes.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", [__dirname + "/views", __dirname + "/views/auth"]);
app.use("/products", express.static("public"));
app.use("/current-stat", express.static("public"));

// Routes

app.get("/", routes.getIndexRoute);

app.route("/login")
  .get(routes.getLoginRoute)
  .post(routes.postLoginRoute);

app.route("/register")
  .get(routes.getRegisterRoute)
  .post(routes.postRegisterRoute);

// Routes after authentication

app.get("/home", routes.getHomeRoute);

app.get("/products/precision-irrigation", routes.getPIRoute);

app.get("/products/crop-suggestion", routes.getCSRoute);

app.get("/products/fertilizer-suggestion", routes.getFSRoute);

app.get("/current-stat/weather-forecast", routes.getWFRoute);

app.get("/current-stat/view-land", routes.getViewLandRoute);

app.get("/current-stat/crop-details", routes.getCropDetailsRoute);

app.get("/settings", routes.settingsRoute);

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
