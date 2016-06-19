import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiYXJyYXlqYW0iLCJhIjoiY2lwbW9ubXNiMDA0dHRibWNwcXVpYXVjbiJ9.zdSKQ2cnswTFRHFsg1ZnNg";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/arrayjam/cinjxlkne002zb7mbxe807imk",

  zoom: 13,
  center: [145.129434, -38.051802],
});
