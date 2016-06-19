export default {
  entry: "./index.js",
  format: "umd",
  dest: "postcodes.js",
  globals: {
    "mapbox-gl": "mapboxgl",
  },
  external: [ "mapbox-gl" ],
};
