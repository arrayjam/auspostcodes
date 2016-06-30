import mapboxgl from "mapbox-gl";
import { feature } from "topojson";

console.log(feature);

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
  map.style.on("tile.load", function() {
    var query = map.querySourceFeatures("mapbox://arrayjam.88b94e49", { sourceLayer: "POA_2011_AUST_DIGITS", filter: filter });
    console.log(map, newLayer, query);
  });
});
