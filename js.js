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

  change();


  function updateLegend(legend) {
    svg.selectAll(".legend").remove();

    svg.selectAll("rect.legend")
        .data(legend)
      .enter().append("rect")
        .attr("class", "legend")
        .attr("y", 10)
        .attr("x", function(d) { return width - 10 * 30 + d * 30; })
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function(d) { return color(d); });

    svg.selectAll("text.legend")
        .data(legend)
      .enter().append("text")
        .attr("class", "legend")
        .attr("y", 20)
        .attr("x", function(d) { return width - 10 * 30 + d * 30 + 10; })
        .style("fill", "white")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(String);
  }

  function setFoundStyle(selection, postcode) {
    selection.style("fill", color(postcode.slice(-1)));
  }

  function setNormalStyle(selection) {
    selection.style("fill", "#222");
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
    feature.each(function(d) {
      var match = matchingFeature(d, matchString);
      this.style.fill = match ? color(nextDigit(d, matchString)) : "#222";
      if (match) { bounds = findBounds(path.bounds(d)); }
    });

    if (shouldZoom) { g.call(zoom, bounds, 100); }
    if (shouldUnzoom) { g.call(unzoom); }
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

