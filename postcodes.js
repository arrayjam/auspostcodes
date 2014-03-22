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

      var g = d3.select("svg").append("g");
      console.log(d3.select("svg"));

      var projection = d3.geo.albers()
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

    });
  }
});

new App.Decoder();

