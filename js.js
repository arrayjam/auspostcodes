/*globals d3:false,topojson:false*/

var width = 750,
    height = 700;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

var color = d3.scale.category10();

d3.json("postcodes.json", function(error, postcodes) {
  var postcodesgeo = topojson.object(postcodes, postcodes.objects.postcodesgeo).geometries;

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

  var prefix = "POA";

  var feature = g.selectAll("path")
      .data(postcodesgeo)
    .enter().append("path")
      .attr("class", "feature")
      .attr("d", path);

  svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", 50)
      .attr("width", width)
      .style("fill", "white");

  svg.append("line")
      .attr("class", "divider")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", 51)
      .attr("y2", 51);

  var legends = svg.append("g").attr("class", "legends");

  svg.selectAll("text.legend")
      .data([0,1,2,3,4,5,6,7,8,9])
    .enter().append("text")
      .attr("class", "legend")
      .attr("y", 25)
      .attr("x", function(d) { return width - (10 - d) * 50 + 25; })
      .style("fill", "white")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("font-size", 20)
      .style("z-index", 100)
      .text(String);

  change();


  function updateLegend(legend) {
    console.log(legend);
    var container = legends.selectAll("rect.legend")
        .data(legend, function(d) { return d; });

    container
      .transition().duration(750)
        .attr("x", function(d) { return width - (10 - d) * 50; })
        .style("fill", function(d) { console.log(color(d)); return color(d); })
        .attr("y", 0);

    container.enter().append("rect")
        .attr("class", "legend")
        .attr("y", -50)
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", function(d) { return width - (10 - d) * 50; })
      .transition()
        .duration(750)
        .ease("bounce")
        .style("fill", function(d) { console.log(color(d)); return color(d); })
        .attr("y", 0);

    container.exit().transition().duration(400)
        .ease("backs")
        .attr("y", -50)
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

  var selectedPostcode;
  function change() {
    //console.log(postcodes);
    var lastPostcode = selectedPostcode;
    selectedPostcode = input.property("value");
    //console.log("selectedPostcode", selectedPostcode);
    if (lastPostcode === selectedPostcode) {
      return;
    }

    var shouldUnzoom = selectedPostcode === "";
    var shouldZoom = selectedPostcode.match(/\d{1,4}/);

    if (!shouldUnzoom && !shouldZoom) {
      return;
    }

    var matchString = prefix + selectedPostcode;
    var findBounds = findMinMaxBounds();
    console.log(feature);
    var bounds;
    var legendObj = {};
    var matching = feature.filter(function(d) {
      var match = matchingFeature(d, matchString);
      var next = nextDigit(d, matchString);
      this.style.fill = match ? color(+next) : "#222";
      if (match) {
        if (next) { legendObj[+next] = true; }
        bounds = findBounds(path.bounds(d));
      }
      return match;
    });

    updateLegend(d3.keys(legendObj).map(function(d) { return +d; }));
    if (matching[0].length === 0) { return; }
    if (selectedPostcode.length === 4 && matching[0].length === 1) { matching.call(setFoundStyle, matchString); }
    console.log(legendObj);
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
    return feature.id.indexOf(string) !== -1;
  }


//    var nextDigitPosition = prefix.length + selectedPostcode.length;
//    var nextLegend = {};
//    feature.transition(2000).style("fill", function(d) {
//      if (d.id.indexOf(prefix+selectedPostcode) !== -1) {
//        var nextDigit = +d.id.charAt(nextDigitPosition);
//        nextLegend[nextDigit] = true;
//        return color(nextDigit);
//      } else {
//        return "#222";
//      }
//    });


  //  if (shouldUnzoom) {
  //    console.log("unzooming");
  //    g.call(unzoom);
  //  }
  //  if (shouldZoom) {
  //    g.call(zoom, calculateBounds(bounds), 100);
  //  }

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

