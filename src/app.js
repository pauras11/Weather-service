const express = require("express");
const path = require("path");
const hbs = require("hbs");
const Geocode = require("./utils/geo");
const address = require("./utils/add");

const app = express();

// Define Paths
const pubDir = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// SetUp static directory
app.use(express.static(pubDir));

// setUp handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pauras",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about me",
    name: "Pauras",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help Page",
    name: "Pauras",
  });
});

// app.get("", (req, res) => {
//   res.send("<h1>Hello There!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "Pauras",
//     age: 24,
//   });
// });
// app.get("/about", (req, res) => {
//   res.send("<h4>About Page</h4>");
// });
app.get("/weather", (req, res) => {
  if (!req.query.add)
    return res.send({
      error: "Please Provide address",
    });

  address(req.query.add, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    Geocode(lat, lng, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        forcast: forcastData,
        location,
        address: req.query.add,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pauras",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pauras",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is on port 3000");
});
