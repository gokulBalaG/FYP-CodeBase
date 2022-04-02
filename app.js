const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
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

app.get("/login", routes.getLoginRoute);
app.post("/login", routes.postLoginRoute);

app.get("/register", routes.getRegisterRoute);
app.post("/register", routes.postRegisterRoute);

// After authentication

app.get("/home", routes.getHomeRoute);

app.get("/products/precision-irrigation", routes.getPIRoute);

app.get("/products/crop-suggestion", routes.getCSRoute);

app.get("/products/fertilizer-suggestion", routes.getFSRoute);

app.get("/current-stat/weather-forecast", routes.getWeatherForecastRoute);

app.post("/current-stat/weather-forecast", routes.postWeatherForecastRoute);

app.get("/current-stat/view-land", routes.getViewLandRoute);

app.get("/current-stat/crop-details", routes.getCropDetailsRoute);

app.get("/settings", routes.settingsRoute);

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}!`);
});
