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

var bounds = {};
geojson.features.forEach(function(feature) {
  var id = feature.properties.postcode;
  var geometry = feature.geometry;

  if (geometry) {
    var e = extent(feature);
    // NOTE(yuri): Convert from WSEN to [[W, N], [E, S]]
    var converted = [[ e[0], e[3] ], [ e[2], e[1] ]];
    bounds[id] = converted;
  }
});

process.stdout.write(JSON.stringify(bounds));

