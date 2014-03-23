window.App = {};

App.Input = Ractive.extend({
  template: '#input',
  init: function() {
    var self = this;

    self.observe("selectedPostcode", function(value) {
      self.fire("changed-postcode", value);
    });
  }
});

App.Decoder  = Ractive.extend({
  el: '.container',
  template: "#decoder",

  data: {
    loaded: false
  },

  components: {
    postcode: App.Input
  },

  init: function() {
    var self = this;

    self.on("decode", function(postcode) {
      console.log("decode", postcode);
    });

    self.setup();
  },

  setup: function() {
    var self = this;
    d3.json("data/combined.topo.json", function(geo) {
      self.set("loaded", true);
      var suburbsGeo = topojson.feature(geo, geo.objects.suburbs).features,
          postcodesGeo = topojson.feature(geo, geo.objects.postcodes).features,
          australiaGeo = topojson.mesh(geo, geo.objects.australia, function(a, b) { return a === b; });

      postcodesGeo.forEach(function(d) {
        d.properties.postcode = d.properties.postcode.substr(3, 4);
      });

      var width = 1500,
          height = 700;

      var g = d3.select("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g");

      var projection = d3.geo.albers()
          .translate([width / 2, height / 2])
          .rotate([-132.5, 0])
          .center([0, -26.5])
          .parallels([-36, -18])
          .scale(1100);

      var path = d3.geo.path()
          .projection(projection);

      g.append("path")
          .attr("class", "outline")
          .datum(australiaGeo)
          .attr("d", path);

      self.precalculatePrefixBounds(postcodesGeo);

      var selected = {type: "GeometryCollection", geometries: geo.objects.postcodes.geometries.filter(function(d) { return d.properties.postcode.indexOf("6") === 0; })},
          selectionBoundary = topojson.mesh(geo, selected, function(a, b) { return a === b; });

      g.append("path")
          .datum(selectionBoundary)
          .attr("d", path)
          .style("fill", "none")
          .style("stroke", "steelblue");

      // [[Left bottom] [right top]]
      //.data(d3.values(self.get("bounds")).map(function(d) { return d.map(projection); }))
    });
  },

  precalculatePrefixBounds: function(features) {
    var self = this;
    self.set("bounds", {});
    var getBoundsOfPostcodePrefix = function(prefix) {
      var boundBounds = [[Infinity, Infinity], [-Infinity, -Infinity]];
      var postcodes = features.filter(function(feature) {
        return feature.properties.postcode.indexOf(prefix) === 0;
      });

      if (!postcodes.length) return undefined;

      postcodes.forEach(function(feature) {
        var bound = d3.geo.bounds(feature);
        boundBounds[0][0] = Math.min(boundBounds[0][0], bound[0][0]);
        boundBounds[0][1] = Math.min(boundBounds[0][1], bound[0][1]);
        boundBounds[1][0] = Math.max(boundBounds[1][0], bound[1][0]);
        boundBounds[1][1] = Math.max(boundBounds[1][1], bound[1][1]);
      });
      return boundBounds;
    };

    // Calculate bounds for all collections of features.
    // Once we get to 4 digit numbers we can just calculate the bounds of the feature
    d3.range(1, 5, 1).forEach(function(prefixLength) {
      var postcodeFormat = d3.format("0" + prefixLength + "d");

      d3.range(Math.pow(10, prefixLength)).forEach(function(prefix) {
        var bounds = getBoundsOfPostcodePrefix(postcodeFormat(prefix));
        if (bounds) self.set("bounds." + prefix, bounds);
      });
    });
  }
});

new App.Decoder();

