/*globals d3:false,topojson:false*/

var width = 750,
    height = 700;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var g = svg.append("g");

//var color = d3.scale.category10();

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
      .on("cut", function() { setTimeout(change, 10); })
      .on("paste", function() { setTimeout(change, 10); })
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


//  function updateLegend(legend) {
//    svg.selectAll(".legend").remove();
//
//    svg.selectAll("rect.legend")
//        .data(legend)
//      .enter().append("rect")
//        .attr("class", "legend")
//        .attr("y", 10)
//        .attr("x", function(d) { return width - 10 * 30 + d * 30; })
//        .attr("width", 20)
//        .attr("height", 20)
//        .style("fill", function(d) { return color(d); });
//
//    svg.selectAll("text.legend")
//        .data(legend)
//      .enter().append("text")
//        .attr("class", "legend")
//        .attr("y", 20)
//        .attr("x", function(d) { return width - 10 * 30 + d * 30 + 10; })
//        .style("fill", "white")
//        .attr("dy", ".35em")
//        .attr("text-anchor", "middle")
//        .text(String);
//  }

//  function setFoundStyle(selection, postcode) {
//    selection.style("fill", color(postcode.substring(postcode.length - 1)));
//  }

  function setNormalStyle(selection) {
    selection.style("fill", "#222");
  }

  function unzoom(selection) {
    selection.transition().duration(750).attr("transform", "");
  }

  function zoom(selection, bounds, maxScale) {
    var b = bounds;
    var scale = 0.95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
    var usedScale = Math.min(scale, maxScale);
    selection.transition().duration(750).attr("transform",
        "translate(" + projection.translate() + ")" +
        "scale(" + usedScale + ")" +
        "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
  }

  var selectedPostcode;
  function change() {
    var postcode = input.property("value");
    var lastPostcode = selectedPostcode;
    selectedPostcode = postcode;
    if (lastPostcode === selectedPostcode) {
      return;
    } else {
      feature.call(setNormalStyle);
      if (postcode !== "" && postcode.match(/\d{1,4}/)) {
        var matching = feature.filter(function(d) { return d.id.indexOf(prefix+postcode) !== -1; });
        console.log(matching);
        var bounds = d3.map(matching, function(d) { return path.bounds(d); });
        console.log(bounds);
        g.call(zoom, calculateBounds(bounds), 100);
      } else {
        g.call(unzoom);
      }
      //var legendObj = {};
      //for (var i = 0; i < 10; i++) {
      //  feature.filter(findMatching).style("fill", color(i));
      //}
      //var legend = d3.values(legendObj).map(function(num) { return +num; });
      //updateLegend(legend);
    }
  }


  function calculateBounds(bounds) {
    var top = -Infinity;
    var right = -Infinity;
    var bottom = Infinity;
    var left = Infinity;

    bounds.forEach(function(bound) {
      var lb = bound[0][0];
      var bb = bound[0][1];
      var rb = bound[1][0];
      var tb = bound[1][1];
      left = Math.min(lb, left);
      bottom = Math.min(bb, bottom);
      right = Math.max(rb, right);
      top = Math.max(tb, top);
    });

    return [[left, bottom], [right, top]];
  }
});

