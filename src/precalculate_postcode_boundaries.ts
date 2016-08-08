/// <reference path="../typings/index.d.ts"/>

// import { coordEach } from "turf-meta";

// import * as shapefile from "shapefile";

// shapefile.read(process.argv[2], (error, postalGeoJSON) => {


// var bounds = [];
// geojson.features.forEach(function(feature) {
//   var props = feature.properties;
//   var geometry = feature.geometry;

//   if (geometry) {
//     var e = extent(feature);
//     module.exports = function(layer) {
//     var extent = [Infinity, Infinity, -Infinity, -Infinity];
//     each(layer, function(coord) {
//       if (extent[0] > coord[0]) extent[0] = coord[0];
//       if (extent[1] > coord[1]) extent[1] = coord[1];
//       if (extent[2] < coord[0]) extent[2] = coord[0];
//       if (extent[3] < coord[1]) extent[3] = coord[1];
//     });
//     return extent;
// };

//     var result = {
//       // NOTE(yuri): Convert from WSEN to [[W, N], [E, S]]
//       bounds: [[ e[0], e[3] ], [ e[2], e[1] ]],
//       postcode:    props.postcode,
//       digit_one:   props.digit_one,
//       digit_two:   props.digit_two,
//       digit_three: props.digit_three,
//       digit_four:  props.digit_four,
//     };

//     bounds.push(result);
//   }
// });

// process.stdout.write(JSON.stringify(bounds));