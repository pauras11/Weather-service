const request = require("request");
const Geocode = require("./geo.js");

// function address(place) {
//   const url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoicGF1cmFzMSIsImEiOiJja3p0bDR0cHExNG9tMnVvaGNnYnoyNzdhIn0.xHIBdXMr73rHlWB6RDH2ag&limit=1`;

//   return request({ url: url1, json: true }, (error, response) => {
//     // console.log(response.body);

//     if (error) {
//       console.log("Can't find your location");
//     } else if (response.body.features.length === 0) {
//       console.log("enter the country right");
//     } else {
//       const place = response.body.features[0].place_name;
//       lat = response.body.features[0].center[1];
//       lng = response.body.features[0].center[0];
//       // Geocode(lat, lng);
//       return `We are currently in ${place} at Latitude of ${lat}, and longitude of ${lng}`;
//     }
//   });
// }

const address = (place, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1IjoicGF1cmFzMSIsImEiOiJja3p0bDR0cHExNG9tMnVvaGNnYnoyNzdhIn0.xHIBdXMr73rHlWB6RDH2ag&limit=1`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Can't find your location");
    } else if (response.body.features.length === 0) {
      callback("enter the country right");
    } else {
      callback(undefined, {
        location: response.body.features[0].place_name,
        lat: response.body.features[0].center[1],
        lng: response.body.features[0].center[0],
      });
    }
  });
};

// address("Thane", (error, data) => {
//   console.log("error", error);
//   console.log("data", data);
// });
module.exports = address;
