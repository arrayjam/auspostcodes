var fs = require("fs");
var process = require("process");
var invariant = require("invariant");
var extent = require("turf-extent");

invariant(
  process.argv.length === 3,
  "Must be called with filename as argument."
);

var file = fs.readFileSync(process.argv[2]);
var geojson = JSON.parse(file);

invariant(
  "type" in geojson && geojson.type === "FeatureCollection" && "features" in geojson,
  "Expected a FeatureCollection."
);

var bounds = [];
geojson.features.forEach(function(feature) {
  var props = feature.properties;
  var geometry = feature.geometry;

  if (geometry) {
    var e = extent(feature);
    var result = {
      // NOTE(yuri): Convert from WSEN to [[W, N], [E, S]]
      bounds: [[ e[0], e[3] ], [ e[2], e[1] ]],
      postcode:    props.postcode,
      digit_one:   props.digit_one,
      digit_two:   props.digit_two,
      digit_three: props.digit_three,
      digit_four:  props.digit_four,
    };

    bounds.push(result);
  }
});

process.stdout.write(JSON.stringify(bounds));

