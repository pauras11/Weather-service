const address = require("./add.js");
const Geocode = require("./geo.js");

address("Thane", (error, data) => {
  if (error) {
    console.log(error);
  }
  // console.log(data);
  Geocode(data.lat, data.lng, (error, forcastData) => {
    if (error) {
      console.log(error);
    }
    console.log(data.location);
    console.log(forcastData);
  });
});
