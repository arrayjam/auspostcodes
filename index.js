import mapboxgl from "mapbox-gl";
import { feature } from "topojson";
import { json } from "d3-request";

var digitProperties = ["digit_one", "digit_two", "digit_three", "digit_four"];
var testPostcode = [null, null, null, null];

json("bounds.json", function(error, bounds) {
  var bound = getBounds(bounds, testPostcode);
  console.log(bound);

  mapboxgl.accessToken = "pk.eyJ1IjoiYXJyYXlqYW0iLCJhIjoiY2lwbW9ubXNiMDA0dHRibWNwcXVpYXVjbiJ9.zdSKQ2cnswTFRHFsg1ZnNg";
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/arrayjam/cinjxlkne002zb7mbxe807imk",

    zoom: 13,
    center: [145.129434, -38.051802],
  });

  var filter = [ "==", "digit_four", 3 ];

  var newLayer = {
    "id": "newLayer",
    "source": "mapbox://arrayjam.88b94e49",
    "source-layer": "POA_2011_AUST_DIGITS",
    "type": "fill",
    "paint": {
      "fill-color": "#ff0000",
    },
    "filter": filter,
  };

  window.newLayer = newLayer;
  window.map = map;
  window.filter = filter;

  map.style.on("load", function() {
    map.addLayer(newLayer);
    map.fitBounds(bound);
    // map.style.on("tile.load", function() {
    // var query = map.querySourceFeatures("mapbox://arrayjam.88b94e49", { sourceLayer: "POA_2011_AUST_DIGITS", filter: filter });
    // console.log(map, newLayer, query);
    // });
  });
});

function getBounds(bounds, postcode) {
  var allBounds = bounds.filter(function(bound) {
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

  var merged = mergeBounds(allBounds);
  console.log(merged);

  return merged;
}

function mergeBounds(bounds) {
  var b = [[Infinity, Infinity], [-Infinity, -Infinity]];

  bounds.forEach(function(boundRaw) {
    var bound = boundRaw.bounds;
    console.log(bound);
    if (bound[0][0] < b[0][0]) b[0][0] = bound[0][0];
    if (bound[0][1] < b[0][1]) b[0][1] = bound[0][1];
    if (bound[1][0] > b[1][0]) b[1][0] = bound[1][0];
    if (bound[1][1] > b[1][1]) b[1][1] = bound[1][1];
  });

  return b;
}
