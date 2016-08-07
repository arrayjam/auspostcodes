import mapboxgl from "mapbox-gl";
// import { feature } from "topojson";
// import { json } from "d3-request";
// import { schemeCategory10 as colors } from "d3-scale";
// import { range } from "d3-array";
// import { select } from "d3-selection";
import * as d3 from "d3";

var digitProperties = ["digit_one", "digit_two", "digit_three", "digit_four"];
var testPostcodes = [
  [null, null, null, null], // 0
  [3   , null, null, null], // 1
  [3   , 1   , null, null], // 2
  [3   , 1   , 9   , null], // 3
  [3   , 1   , 9   , 6]   , // 4
];

d3.json("bounds.json", function(error, bounds) {
  var map = initMap();
  window.map = map;

  map.style.on("load", function() {
    var postcodeIndex = 2;
    var addedLayers = false;
    d3.select(".postcode").on("input", function() {
      if (addedLayers) clearMapLayers(map);
      var value = d3.select(this).property("value").split("");
      var postcode = [ null, null, null, null ];
      for (var valueIndex = 0; valueIndex < value.length && valueIndex < 4; valueIndex++) {
        postcode[valueIndex] = +value[valueIndex];
      }

      console.log(postcode);

      // debugger
      var layers = buildLayers(buildFilters(postcode));
      // debugger
      setMapLayers(map, layers);
      var bound = getBounds(bounds, postcode);
      console.log(layers);
      if (bound.infos.length) {
        map.fitBounds(bound.bounds);
        addedLayers = true;
      }


    });
    // var interval = setInterval(function() {
    //   if (addedLayers) clearMapLayers(map);
    //   if (postcodeIndex === testPostcodes.length - 1) {
    //     clearInterval(interval);
    //   }

    //   var postcode = testPostcodes[postcodeIndex];
    //   var layers = buildLayers(buildFilters(postcode));
    //   setMapLayers(map, layers);
    //   var bound = getBounds(bounds, postcode);
    //   map.fitBounds(bound.bounds);
    //   addedLayers = true;
    //   postcodeIndex++;
    // }, 5000);

  });
});

function clearMapLayers(map) {
  d3.range(10).map(function(id) {
    try {
      map.removeLayer(id.toString());
    } catch (e) {
    }
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
        "fill-color": d3.schemeCategory10[filterIndex],
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
  for (digitIndex = 0; digitIndex < postcode.join("").length; digitIndex++) {
    var digitKey = digitProperties[digitIndex];
    var digit = postcode[digitIndex];
    baseFilter.push([ "==", digitKey, digit ]);
  }

  if (digitIndex === postcode.length) {
    return [ baseFilter ];
  } else {
    // Return 10 filters with existing filter + each digit
    return d3.range(10).map(function(digit) {
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

  var envelopeRatio = 0.3;

  var envelope = Math.max(side * envelopeRatio, 0.1);

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

