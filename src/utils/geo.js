const request = require("request");

// function Geocode(lat, lng) {
//   const url = ` http://api.weatherstack.com/current?access_key=12cc370d92b3cfa528205fea40f320f0&query=${lat},${lng}`;

//   request({ url: url, json: true }, (error, response) => {
//     //   console.log(response.body.current);

//     if (error) {
//       console.log("Unable to connect to Weather Forcaster");
//     } else if (response.body.error) {
//       console.error(`${response.body.error.info}/${response.body.error.code}`);
//     } else {
//       const temp = response.body.current.temperature;
//       const feel = response.body.current.feelslike;
//       const des = response.body.current.weather_descriptions;
//       console.log(
//         `${des} :It is ${temp} deg outside, but feels like ${feel} deg.`
//       );
//     }
//   });
// }

const Geocode = (lat, lng, callback) => {
  const url = ` http://api.weatherstack.com/current?access_key=12cc370d92b3cfa528205fea40f320f0&query=${lat},${lng}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to Weather Forcaster");
    } else if (response.body.error) {
      callback(`${response.body.error.info}/${response.body.error.code}`);
    } else {
      const temp = response.body.current.temperature;
      const feel = response.body.current.feelslike;
      const des = response.body.current.weather_descriptions;
      callback(
        undefined,
        `${des} :It is ${temp} deg outside, but feels like ${feel} deg.`
      );
    }
  });
};

module.exports = Geocode;
