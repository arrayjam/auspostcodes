import npm from "rollup-plugin-node-resolve";

export default {
  entry: "index.js",
  format: "umd",
  dest: "postcodes.js",
  globals: {
    "mapbox-gl": "mapboxgl",
    "topojson": "topojson",
  },
  external: [ "mapbox-gl" ],
  plugins: [ npm({ jsnext: true }) ],
};
