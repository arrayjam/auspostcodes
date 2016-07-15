import mapboxgl from "mapbox-gl";
import { feature } from "topojson";
import { json } from "d3-request";
import { schemeCategory10 as colors } from "d3-scale";
import { range } from "d3-array";

var digitProperties = ["digit_one", "digit_two", "digit_three", "digit_four"];
var testPostcodes = [
  [null, null, null, null], // 0
  [3   , null, null, null], // 1
  [3   , 1   , null, null], // 2
  [3   , 1   , 9   , null], // 3
  [3   , 1   , 9   , 6]   , // 4
];

json("bounds.json", function(error, bounds) {
  var map = initMap();
  window.map = map;


  // var boundInfo =

  // var bound = getBounds(bounds, postcode);

  map.style.on("load", function() {
    var postcodeIndex = 0;
    var addedLayers = false;
    var interval = setInterval(function() {
      // if (addedLayers) clearMapLayers(map);
      if (postcodeIndex === testPostcodes.length - 1) {
        clearInterval(interval);
      }

      var postcode = testPostcodes[postcodeIndex];
      var layers = buildLayers(buildFilters(postcode));
      setMapLayers(map, layers);
      addedLayers = true;
      postcodeIndex++;


    }, 2000);
  });
  // moveMap(map, bound, filter);
  // makeMap(testBounds.map(function(b) { return getBounds(bounds, b); }));
});

function clearMapLayers(map) {
  range(10).map(function(id) {
    map.removeLayer(id.toString());
  });
}

function setMapLayers(map, layers) {
  layers.forEach(function(layer) {
    map.addLayer(layer, "Roads");
  });
}

function buildLayers(filters) {
  return filters.map(function(filter, filterIndex) {
    return {
      "id": filterIndex.toString(),
      "source": "mapbox://arrayjam.88b94e49",
      "source-layer": "POA_2011_AUST_DIGITS",
      "type": "fill",
      "paint": {
        "fill-color": colors[filterIndex],
        "fill-opacity": 0.6,
      },
      "filter": filter,
    };
  });
}

function buildFilters(postcode) {
  var baseFilter = ["all"];

  // Build filter for existing digits
  var digitIndex;
  for (digitIndex = 0; postcode[digitIndex]; digitIndex++) {
    var digitKey = digitProperties[digitIndex];
    var digit = postcode[digitIndex];
    baseFilter.push([ "==", digitKey, digit ]);
  }

  if (digitIndex === postcode.length) {
    return [ baseFilter ];
  } else {
    console.log(digitIndex);
    // Return 10 filters with existing filter + each digit
    return range(10).map(function(digit) {
      var digitFilter = baseFilter.slice();
      var digitKey = digitProperties[digitIndex];
      if (digitKey) {
        digitFilter.push([ "==", digitKey, digit ]);
      }

      return digitFilter;
    });
  }
}

function getBounds(bounds, postcode) {
  var filteredBoundsInfos = bounds.filter(function(bound) {
    var result = true;

    for (var postcodeIndex = 0; postcodeIndex < 4; postcodeIndex++) {
      var digit = postcode[postcodeIndex];
      if (digit !== null) {
        if (bound[digitProperties[postcodeIndex]] !== digit) {
          result = false;
          break;
        }
      }
    }

    return result;
  });

  var result = {};

  var extent = mergeBounds(filteredBoundsInfos);
  extent = makeEnvelope(extent);

  result.infos = filteredBoundsInfos;
  result.bounds = extent;

  return result;
}

function makeEnvelope(bounds) {
  var width  = bounds[1][0] - bounds[0][0];
  var height = bounds[1][1] - bounds[0][1];
  var side = Math.max(width, height);

  var envelopeRatio = 0.2;

  var envelope = Math.max(side * envelopeRatio, 0.02);

  return [
    [ bounds[0][0] - envelope, bounds[0][1] - envelope ],
    [ bounds[1][0] + envelope, bounds[1][1] + envelope ],
  ];
}

function mergeBounds(bounds) {
  var b = [[Infinity, Infinity], [-Infinity, -Infinity]];

  bounds.forEach(function(boundRaw) {
    var bound = boundRaw.bounds;
    if (bound[0][0] < b[0][0]) b[0][0] = bound[0][0];
    if (bound[0][1] < b[0][1]) b[0][1] = bound[0][1];
    if (bound[1][0] > b[1][0]) b[1][0] = bound[1][0];
    if (bound[1][1] > b[1][1]) b[1][1] = bound[1][1];
  });

  return b;
}

function initMap() {
  mapboxgl.accessToken = "pk.eyJ1IjoiYXJyYXlqYW0iLCJhIjoiY2lwbW9ubXNiMDA0dHRibWNwcXVpYXVjbiJ9.zdSKQ2cnswTFRHFsg1ZnNg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/arrayjam/cinjxlkne002zb7mbxe807imk",

    zoom: 13,
    center: [145.129434, -38.051802],
  });

  return map;
}

//   var filter = [ "==", "digit_four", 3 ];

//   var newLayer = {
//     "id": "newLayer",
//     "source": "mapbox://arrayjam.88b94e49",
//     "source-layer": "POA_2011_AUST_DIGITS",
//     "type": "fill",
//     "paint": {
//       "fill-color": "#ff0000",
//     },
//     "filter": filter,
//   };

//   window.newLayer = newLayer;
//   window.map = map;
//   window.filter = filter;

//   map.style.on("load", function() {
//     map.addLayer(newLayer);

//     var boundIndex = 0;
//     var interval = setInterval(function() {
//       if (boundIndex >= bounds.length) {
//         clearInterval(interval);
//         return;
//       }

//       map.fitBounds(bounds[boundIndex++]);
//     }, 3000);
//     // map.style.on("tile.load", function() {
//     // var query = map.querySourceFeatures("mapbox://arrayjam.88b94e49", { sourceLayer: "POA_2011_AUST_DIGITS", filter: filter });
//     // console.log(map, newLayer, query);
//     // });
//   });
// }
