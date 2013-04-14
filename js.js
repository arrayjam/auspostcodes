/*globals d3:false,topojson:false*/

var width = 700,
    height = 700;

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height + 50);

var g = svg.append("g")
  .attr("transform", "translate(0, 50)")
    .append("g");

var color = d3.scale.category10();

var loading = svg.append("text")
  .attr("x", width / 2)
  .attr("y", height / 2)
  .attr("dy", ".35em")
  .attr("text-anchor", "middle")
  .style("font-size", 40)
  .text("Loading...");

d3.json("postcodes.json", function(error, geo) {
  var postcodesGeo = topojson.object(geo, geo.objects.postcodesgeo).geometries;
  var seaBordersGeo = topojson.mesh(geo, geo.objects.states, function (a, b) { return a === b; });
  var stateBordersGeo = topojson.mesh(geo, geo.objects.states, function (a, b) { return a !== b; });

  var mainlandWidth = 236;
  var leftMargin = 186;
  var rightMargin = 64;

  var allAus = mainlandWidth + leftMargin + rightMargin;
  var translateWidth = width / (allAus / mainlandWidth);

  var projection = d3.geo.albers()
    .translate([translateWidth, height / 2])
    .scale(1100)
    .rotate([-132.5, 0])
    .center([0, -26.5]) // Center of Australia, accounting for tasmania
    .parallels([-36, -18]);

  var path = d3.geo.path()
    .projection(projection);

  var input = d3.select("input")
      .on("cut", change)
      .on("paste", change)
      .on("change", change)
      .on("keyup", change);

  g.append("path")
    .datum(seaBordersGeo)
      .attr("class", "sea-border")
      .attr("d", path);

  var feature = g.selectAll("path.feature")
      .data(postcodesGeo)
    .enter().append("path")
      .attr("class", "feature")
      .attr("d", path)
      .on("mouseover", tipover)
      .on("mouseout", tipout)
      .on("click", boom);

  g.append("path")
    .datum(stateBordersGeo)
      .attr("class", "state-border")
      .attr("d", path);

  loading.remove();

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 70)
      .attr("width", width)
      .style("fill", "white");

  svg.append("line")
      .attr("class", "divider")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 71)
      .attr("y2", 71);

  var legends = svg.append("g").attr("class", "legends");

  var namesContainer = d3.select(".names ul");
  var selectedPostcode;

  change();

  function boom() {
    this.remove();
  }

  function tipover(feature) {
    var names = feature.properties.names.split(",");
    console.log(names);
    var boundNames = namesContainer.selectAll("li")
        .data(names, function(d) { return d; });

    boundNames.enter().append("li")
        .text(String);

    boundNames.exit().remove();
  }

  function tipout() {
    //namesContainer.selectAll("li").remove();
  }

  function updateLegend(legend) {
    var rectContainer = legends.selectAll("rect.legend")
        .data(legend, function(d) { return d; });

    rectContainer.enter().append("rect")
        .attr("class", "legend")
        .attr("y", -70)
        .attr("width", 70)
        .attr("height", 70)
        .attr("x", function(d) { return width - (10 - d) * 70; })
        .style("fill", function(d) { return color(d); })
      .transition().duration(750).ease("bounce")
        .attr("y", 0);

    rectContainer.exit().transition().duration(400)
        .ease("backs")
        .attr("y", -70)
        .remove();

    var textContainer = legends.selectAll("text.legend")
        .data(legend, function(d) { return d; });

    textContainer.enter().append("text")
        .attr("class", "legend")
        .attr("y", -35)
        .attr("x", function(d) { return width - (10 - d) * 70 + 35; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", 25)
        .text(String)
      .transition().duration(750).ease("bounce")
        .attr("y", 35);

    textContainer.exit()
      .transition().duration(400)
        .ease("backs")
        .attr("y", -35)
        .remove();
  }

  function setFoundStyle(selection, postcode) {
    selection.style("fill", color(postcode.slice(-1)));
  }

  function unzoom(selection) {
    selection.transition().duration(750).attr("transform", "");
  }

  function zoom(selection, b, maxScale) {
    var scale = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
    var usedScale = Math.min(scale, maxScale);
    selection.transition().duration(750).attr("transform",
        "translate(" + projection.translate() + ")" +
        "scale(" + usedScale + ")" +
        "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
  }

  function change() {
    var lastPostcode = selectedPostcode;
    selectedPostcode = input.property("value");
    if (lastPostcode === selectedPostcode) {
      return;
    }

    d3.select(".winner").remove();

    var shouldUnzoom = selectedPostcode === "";
    var shouldZoom = selectedPostcode.match(/\d{1,4}/);

    if (!shouldUnzoom && !shouldZoom) {
      return;
    }

    var findBounds = findMinMaxBounds();
    var bounds;
    var legendObj = {};
    var matching = feature.filter(function(d) {
      var match = matchingFeature(d, selectedPostcode);
      var next = nextDigit(d, selectedPostcode);
      this.style.fill = match ? color(+next) : "#222";
      if (match) {
        if (next) { legendObj[+next] = true; }
        bounds = findBounds(path.bounds(d));
      }
      return match;
    });

    updateLegend(d3.keys(legendObj).map(function(d) { return +d; }));
    if (matching[0].length === 0) { return; }
    if (selectedPostcode.length === 4 && matching[0].length === 1) {
      matching.call(setFoundStyle, selectedPostcode);
      matchingDisplay(selectedPostcode);
    }

    var zoomers = function() {
      if (shouldZoom) { g.call(zoom, bounds, 100); }
      if (shouldUnzoom) { g.call(unzoom); }
    };
    setTimeout(zoomers, 0);

  }

  function nextDigit(feature, string) {
    return feature.id.charAt(string.length);
  }

  function matchingFeature(feature, string) {
    return feature.id.indexOf(string) === 0;
  }

  function matchingDisplay(postcode) {
    var winner = svg.append("g")
        .attr("class", "winner");

    winner.append("rect")
        .style("fill", "#222")
        .attr("width", width)
        .attr("height", 70);

    winner.selectAll("rect.winners")
        .data(postcode.split(""))
      .enter().append("rect")
        .attr("class", "winners")
        .attr("width", 70)
        .attr("height", 70)
        .attr("y", 0)
        .attr("x", function(d, i) { return width - (4 - i) * 70 - width / 2 + 70 * 2; })
        .style("fill", function(d) { return color(d); });

    winner.selectAll("text.winners")
        .data(postcode.split(""))
      .enter().append("text")
        .attr("class", "winners")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-size", 25)
        .attr("y", 35)
        .attr("x", function(d, i) { return width - (4 - i) * 70 - width / 2 + 70 * 2 + 35; })
        .text(String);
  }

  function findMinMaxBounds() {
    var topBound    = -Infinity;
    var rightBound  = -Infinity;
    var bottomBound =  Infinity;
    var leftBound   =  Infinity;
    return function (bound) {
      leftBound = Math.min(bound[0][0], leftBound);
      bottomBound = Math.min(bound[0][1], bottomBound);
      rightBound = Math.max(bound[1][0], rightBound);
      topBound = Math.max(bound[1][1], topBound);
      return [[leftBound, bottomBound], [rightBound, topBound]];
    };
  }
});

