/// <reference path="./index.d.ts"/>
import * as turf from "turf";

let pointFeature: GeoJSON.Feature<GeoJSON.Point> = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [-75.343, 39.984],
  },
};

let pointFeature2: GeoJSON.Feature<GeoJSON.Point> = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [-75.534, 39.123],
  },
};

let lineFeature: GeoJSON.Feature<GeoJSON.LineString> = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [-77.031669, 38.878605],
      [-77.029609, 38.881946],
      [-77.020339, 38.884084],
      [-77.025661, 38.885821],
      [-77.021884, 38.889563],
      [-77.019824, 38.892368],
    ],
  },
};

let lineFeatureCollection: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-77.031669, 38.878605],
          [-77.029609, 38.881946],
          [-77.020339, 38.884084],
          [-77.025661, 38.885821],
          [-77.021884, 38.889563],
          [-77.019824, 38.892368],
        ],
      },
    },
  ],
};

let polygonFeatureCollection: GeoJSON.FeatureCollection<GeoJSON.Polygon> = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-67.031021, 10.458102],
          [-67.031021, 10.53372],
          [-66.929397, 10.53372],
          [-66.929397, 10.458102],
          [-67.031021, 10.458102],
        ]],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-66.919784, 10.397325],
          [-66.919784, 10.513467],
          [-66.805114, 10.513467],
          [-66.805114, 10.397325],
          [-66.919784, 10.397325],
        ]],
      },
    },
  ],
};

let polygonFeature: GeoJSON.Feature<GeoJSON.Polygon> = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [105.818939, 21.004714],
      [105.818939, 21.061754],
      [105.890007, 21.061754],
      [105.890007, 21.004714],
      [105.818939, 21.004714],
    ]],
  },
};

let polygonFeature2: GeoJSON.Feature<GeoJSON.Polygon> = {
  "type": "Feature",
  "properties": {
    "fill": "#00f",
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-122.520217, 45.535693],
      [-122.64038, 45.553967],
      [-122.720031, 45.526554],
      [-122.669906, 45.507309],
      [-122.723464, 45.446643],
      [-122.532577, 45.408574],
      [-122.487258, 45.477466],
      [-122.520217, 45.535693],
    ]],
  },
};

let pointFeatureCollection: GeoJSON.FeatureCollection<GeoJSON.Point> = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.522259, 35.4691],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.502754, 35.463455],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.508269, 35.463245],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.516809, 35.465779],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.515372, 35.467072],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.509363, 35.463053],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.511123, 35.466601],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.518547, 35.469327],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.519706, 35.469659],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.517839, 35.466998],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.508678, 35.464942],
      },
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Point",
        "coordinates": [-97.514914, 35.463453],
      },
    },
  ],
};

let triangleFeature: GeoJSON.Feature<GeoJSON.Polygon> = {
  "type": "Feature",
  "properties": {
    "a": 11,
    "b": 122,
    "c": 44,
  },
  "geometry": {
    "type": "Polygon",
    "coordinates": [[
      [-75.1221, 39.57],
      [-75.58, 39.18],
      [-75.97, 39.86],
      [-75.1221, 39.57],
    ]],
  },
};

let pointGeometry: GeoJSON.Point = {
  "type": "Point",
  "coordinates": [0, 0],
};

let polygonGeometry: GeoJSON.Polygon = {
  "type": "Polygon",
  "coordinates": [
    [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
  ],
};

let lineStringGeometry: GeoJSON.LineString = {
  type: "LineString",
  coordinates: [[0, 1], [2, 3]],
};

turf.along(lineFeature, 0.01);
turf.along(lineFeature, 10, "kilometers");

turf.area(lineFeature);
turf.area(polygonFeature);

turf.bbox(polygonFeature);
let bbox = turf.bbox(polygonFeatureCollection);

turf.bboxPolygon(bbox);

turf.bearing(pointFeature, pointFeature2);

turf.bezier(lineFeature);
turf.bezier(lineFeature, 1);
turf.bezier(lineFeature, 1, 1);

turf.buffer(pointFeature, 10, "meters");
turf.buffer(pointFeature, 10);
turf.buffer(pointFeatureCollection, 10, "metres");
turf.buffer(pointFeatureCollection, 10);

turf.center(pointFeatureCollection);

turf.centerOfMass(pointFeatureCollection);

turf.centroid(pointFeatureCollection);

turf.circle(pointFeature, 10, 10);
turf.circle(pointFeature, 10, 10, "kilometers");

turf.collect(polygonFeatureCollection, pointFeatureCollection, "inProp", "outProp");

turf.combine(pointFeatureCollection);
turf.combine(lineFeatureCollection);
turf.combine(polygonFeatureCollection);

turf.concave(pointFeatureCollection, 3, "yards");

turf.convex(pointFeature);
turf.convex(pointFeatureCollection);

turf.difference(polygonFeature, polygonFeature2);

turf.distance(pointFeature, pointFeature2);
turf.distance(pointFeature, pointFeature2, "yards");

turf.envelope(pointFeatureCollection);

turf.explode(pointFeature);
turf.explode(pointFeatureCollection);

turf.flip(polygonFeature);

import {
  feature, point, polygon, lineString, featureCollection,
  multiLineString, multiPoint, multiPolygon, geometryCollection,

  // Private helpers only available to @turf/helpers, not @turf
  radiansToDistance, distanceToRadians, distanceToDegrees,
} from "@turf/helpers";

// Confirm that common @turf/helpers are of the same type
feature === turf.feature;
point === turf.point;
polygon === turf.polygon;
lineString === turf.lineString;
featureCollection === turf.featureCollection;
multiLineString === turf.multiLineString;
multiPoint === turf.multiPoint;
multiPolygon === turf.multiPolygon;
geometryCollection === turf.geometryCollection;

// Test private @turf/helpers functions
radiansToDistance(10, "nauticalmiles");
radiansToDistance(10);

distanceToRadians(10, "kilometers");
distanceToRadians(10);

distanceToDegrees(10, "inches");
distanceToDegrees(10);

// Test common @turf/helpers functions
let properties = { "property": "value" };

turf.feature(polygonGeometry, properties);
turf.feature(polygonGeometry);

turf.point([0, 0], properties);
turf.point([0, 0]);

turf.polygon(polygonGeometry.coordinates, properties);
turf.polygon(polygonGeometry.coordinates);

turf.lineString([[0, 0], [1, 1]], properties);
turf.lineString([[0, 0], [1, 1]]);

turf.featureCollection([lineFeature, pointFeature, pointFeature2]);

turf.multiLineString([[[0, 0], [1, 1]]], properties);
turf.multiLineString([[[0, 0], [1, 1]]]);

turf.multiPoint([[0, 0], [0, 1]], properties);
turf.multiPoint([[0, 0], [0, 1]]);

turf.multiPolygon([polygonFeature.geometry.coordinates, polygonFeature2.geometry.coordinates], properties);
turf.multiPolygon([polygonFeature.geometry.coordinates, polygonFeature2.geometry.coordinates]);

turf.geometryCollection([polygonGeometry, polygonGeometry], properties);
turf.geometryCollection([polygonGeometry, polygonGeometry]);

turf.hexGrid(bbox, 10, "degrees", true);
turf.hexGrid(bbox, 10, "degrees");
turf.hexGrid(bbox, 10);

turf.idw(pointFeatureCollection, "value", 10, 100, "miles");
turf.idw(pointFeatureCollection, "value", 10, 100);

turf.inside(pointFeature, polygonFeature);

// intersect can return a few types:
let intersected: GeoJSON.Feature<GeoJSON.Polygon> | undefined | GeoJSON.Feature<GeoJSON.MultiLineString> = turf.intersect(polygonFeature, polygonFeature2);

import { getCoord, geojsonType, featureOf, collectionOf } from "@turf/invariant";

getCoord(pointFeature);
getCoord(pointGeometry);
getCoord([0, 0]);

geojsonType(pointGeometry, "Point", "test");
featureOf(lineFeature, "LineString", "test");
collectionOf(pointFeatureCollection, "Point", "test");

turf.isolines(pointFeatureCollection, "z-value", 10, [1, 2, 3]);

turf.kinks(polygonFeature);
turf.kinks(polygonGeometry);

turf.lineDistance(lineFeature, "yards");
turf.lineDistance(lineFeature);

turf.lineSlice(pointFeature, pointFeature2, lineFeature);
turf.lineSlice(pointFeature, pointFeature2, lineStringGeometry);

turf.lineSliceAlong(lineFeature, 0, 100, "yards");
turf.lineSliceAlong(lineFeature, 0, 100);

import { coordEach, coordReduce, propEach, propReduce, featureEach, coordAll } from "@turf/meta";

coordEach(pointFeature, (coord) => console.log(coord[0], coord[1]), false);

let arrayReduce: number[] = coordReduce(pointFeatureCollection, (prev, curr) => {
  prev.push(curr);
  return prev;
}, [], false);
let stringReduce: string = coordReduce(pointFeatureCollection, (prev, curr) => prev + curr.toString(), "", false);

propEach(pointFeatureCollection, prop => console.log(prop));

let propCombine: any = propReduce(pointFeatureCollection, (prev, curr) => {
  for (let key in curr) {
    prev[key] = curr[key];
  }
  return prev;
}, {});

featureEach(pointFeatureCollection, feature => console.log(feature));

coordAll(pointFeatureCollection);

turf.midpoint(pointFeature, pointFeature2);

turf.nearest(pointFeature, pointFeatureCollection);

turf.planepoint(pointFeature, triangleFeature);

turf.pointGrid(bbox, 20, "miles");
turf.pointGrid(bbox, 20);

turf.pointOnLine(lineFeature, pointFeature, "nauticalmiles");
turf.pointOnLine(lineFeature, pointFeature);

turf.pointOnSurface(polygonFeature);
turf.pointOnSurface(lineFeature);
turf.pointOnSurface(pointFeature);
turf.pointOnSurface(polygonFeatureCollection);
turf.pointOnSurface(lineFeatureCollection);
turf.pointOnSurface(pointFeatureCollection);

turf.random("points", 10, { bbox: bbox });
turf.random("points", 10, {});
turf.random("points", 10);
turf.random("points");

turf.random("polygon", 10, {
  num_vertices: 10,
  max_radial_length: 10,
  bbox: bbox,
});
turf.random("polygon", 10);
turf.random("polygon");

turf.sample(pointFeatureCollection, 10);

turf.simplify(polygonFeature, 10, false);
turf.simplify(polygonFeatureCollection, 10, false);
turf.simplify(triangleFeature, 10, false);
turf.simplify(lineFeature, 10, false);
turf.simplify(lineFeatureCollection, 10, false);

turf.square(bbox);

turf.squareGrid(bbox, 20, "yards");
turf.squareGrid(bbox, 20);

turf.tag(pointFeatureCollection, polygonFeatureCollection, "inField", "outField");

turf.tesselate(polygonFeature);

turf.tin(pointFeatureCollection, "property");
turf.tin(pointFeatureCollection);

turf.triangleGrid(bbox, 10, "miles");
turf.triangleGrid(bbox, 10);

turf.union(polygonFeature);
turf.union(polygonFeature, polygonFeature2, ...polygonFeatureCollection.features);

turf.within(pointFeatureCollection, polygonFeatureCollection);