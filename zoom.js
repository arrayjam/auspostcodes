var width = 960,
    height = 500;

// This projection is baked into the TopoJSON file,
// but is used here to compute the desired zoom translate.
var projection = d3.geo.albers().rotate([-132.5, 0]).center([0, -26.5]).parallels([-36, -18]);

var melb = projection([144.9631, -37.8136]),
  center = projection.translate(),
  max = 70;

var scale,
    translate,
    area; // minimum area threshold

var clip = d3.geo.clipExtent()
    .extent([[0, 0], [width, height]]);

var simplify = d3.geo.transform({
  point: function(x, y, z) {
    if (z >= area) this.stream.point(x * scale + translate[0], y * scale + translate[1]);
  }
});

var zoom = d3.behavior.zoom()
    .size([width, height])
    .on("zoom", zoomed);

var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection({stream: function(s) { return simplify.stream(clip.stream(s)); }})
    .context(context);

d3.json("data/combined.json", function(error, geo) {
  window.geo = geo;
  var features = topojson.feature(topojson.presimplify(geo), geo.objects.postcodes).features;
  var xf = crossfilter(features),
    vic = xf.dimension(function(d) { return d; }),
    id = xf.dimension(function(d) { return +d.id.slice(3, 7); });

  window.id = id;

  window.vic = vic;
  //id.filter(function(d) { return d.indexOf("POA3") !== -1; });
  //vic.filter(function(d) { return true; });
  canvas
    .datum([
      topojson.mesh(topojson.presimplify(geo), geo.objects.suburbs),
      { features: id.top(Infinity), type: "FeatureCollection" }
      //topojson.mesh(topojson.presimplify(geo), geo.objects.postcodes),
    ])
      .call(zoomTo(center, 1).event)
    .transition()
      .duration(4000)
      .each(jump);
});

function update() {
  canvas
    .datum([
      topojson.mesh(topojson.presimplify(window.geo), window.geo.objects.suburbs),
      { features: window.vic.top(Infinity), type: "FeatureCollection" }
      //topojson.mesh(topojson.presimplify(geo), geo.objects.postcodes),
      //topojson.mesh(topojson.presimplify(geo), geo.objects.suburbs),
    ])
      .call(zoomTo(center, 1).event)
    .transition()
      .duration(4000)
      .each(jump);
}


function zoomTo(point, scale) {
  return zoom
      .translate([width / 2 - point[0] * scale, height / 2 - point[1] * scale])
      .scale(scale);
}

function currentZoom() {
  return zoom
      .translate(translate)
      .scale(scale);
}

function zoomed(d) {
  translate = zoom.translate();
  scale = zoom.scale();
  area = 4 / scale / scale;
  context.clearRect(0, 0, width, height);

  context.strokeStyle = '#222';
  context.strokeWidth = 0.5;
  context.beginPath();
  path(d[0]);
  context.stroke();

  context.fillStyle = 'steelblue';
  context.beginPath();
  path(d[1]);
  context.fill();

}

function jump() {
  var t = d3.select(this);
  (function repeat() {
    t = t.transition()
        .call(zoomTo(center, 1).event)
      .transition()
        .call(zoomTo(melb, max).event)
        .each("end", repeat);
  })();
}

