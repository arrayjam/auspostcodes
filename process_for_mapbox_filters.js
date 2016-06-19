var fs = require("fs");

var postalGeoJSON = JSON.parse(fs.readFileSync("./POA_2011_AUST.geojson"));
// console.log(postalGeoJSON);

postalGeoJSON.features.forEach(function(feature) {
  var postcode = feature.properties.POA_CODE.slice(3);

  var digits = {
    digit_one:   +postcode.slice(0, 1),
    digit_two:   +postcode.slice(1, 2),
    digit_three: +postcode.slice(2, 3),
    digit_four:  +postcode.slice(3, 4),
    postcode:     postcode,
  };

  Object.assign(feature.properties, digits);
});

fs.writeFileSync("POA_2011_AUST_DIGITS.geojson", JSON.stringify(postalGeoJSON));
