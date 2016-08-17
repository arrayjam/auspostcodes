/// <reference types="geojson"/>

declare namespace turf {
    type Units = "miles" | "nauticalmiles" | "degrees" | "radians" | "inches" | "yards" | "meters" | "metres" | "kilometers" | "kilometres";

    /**
     * A bounding box in WSEN order. (west, south, east, north)
     */
    type BoundingBox = [number, number, number, number];

    /**
     * Takes a linestring and returns a Point at a specified distance along the
     * line.
     */
    export function along(line: GeoJSON.Feature<GeoJSON.LineString>, distance: number, units?: Units): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a one or more features and returns their area in square meters.
     */
    export function area(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>): number;

    /**
     * Takes a set of features, calculates the bbox of all input features, and
     * returns a bounding box.
     */
    export function bbox(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>): BoundingBox;

    /**
     * Takes a bbox and returns an equivalent polygon.
     */
    export function bboxPolygon(bbox: BoundingBox): GeoJSON.Feature<GeoJSON.Polygon>

    /**
     * Takes two points and finds the geographic bearing between them.
     */
    export function bearing(start: GeoJSON.Feature<GeoJSON.Point>, end: GeoJSON.Feature<GeoJSON.Point>): number;

    /**
     * Takes a linestring and returns a curved version.
     */
    export function bezier(input: GeoJSON.Feature<GeoJSON.LineString>, resolution?: number, sharpness?: number): GeoJSON.Feature<GeoJSON.LineString>;

    /**
     * Calculates a buffer for input features for a given radius.
     */
    export function buffer(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>, distance: number, units?: Units): GeoJSON.FeatureCollection<GeoJSON.Polygon> | GeoJSON.FeatureCollection<GeoJSON.MultiPolygon> | GeoJSON.Polygon | GeoJSON.MultiPolygon;

    /**
     * Takes a featurecollection and returns the absolute center point of all
     * features.
     */
    export function center(input: GeoJSON.FeatureCollection<any>): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a feature or a featurecollection and returns its center of mass
     * using the Centroid of Polygon formula.
     */
    export function centerOfMass(input: GeoJSON.FeatureCollection<any> | GeoJSON.Feature<any>): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes one or more features and calculates the centroid using the mean of
     * all vertices. This lessens the effect of small islands and artifacts when
     * calculating the centroid of a set of polygons.
     */
    export function centroid(input: GeoJSON.FeatureCollection<any> | GeoJSON.Feature<any>): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a Point and calculates the circle polygon given a radius in units
     * and steps for precision;
     */
    export function circle(point: GeoJSON.Feature<GeoJSON.Point>, radius: number, steps: number, units?: Units): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Joins attributes FeatureCollection of polygons with a FeatureCollection
     * of points. Given an `inProperty` on points and an `outProperty` for
     * polygons, this finds every point that lies within each polygon, collects
     * the `inProperty` values from those points, and adds them as an array to
     * `outProperty` on the polygon.
     */
    export function collect(polygons: GeoJSON.FeatureCollection<GeoJSON.Polygon>, points: GeoJSON.FeatureCollection<GeoJSON.Point>, inProperty: string, outProperty: string): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Combines a featurecollection of point, linestring or polygon features
     * into multipoint, multilinestring or multipolygon featurecollection.
     */
    export function combine(collection: GeoJSON.FeatureCollection<GeoJSON.Point>): GeoJSON.FeatureCollection<GeoJSON.MultiPoint>;
    export function combine(collection: GeoJSON.FeatureCollection<GeoJSON.LineString>): GeoJSON.FeatureCollection<GeoJSON.MultiLineString>;
    export function combine(collection: GeoJSON.FeatureCollection<GeoJSON.Polygon>): GeoJSON.FeatureCollection<GeoJSON.MultiPolygon>;

    /**
     * Takes a set of points and returns a concave hull polygon.
     */
    export function concave(points: GeoJSON.FeatureCollection<GeoJSON.Point>, maxEdge: number, units: Units): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Takes a feature or a featurecollection and returns a convex hull polygon.
     */
    export function convex(input: GeoJSON.FeatureCollection<any> | GeoJSON.Feature<any>): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Finds the difference between two polygons by clipping the second polygon
     * from the first.
     */
    export function difference(input: GeoJSON.Feature<GeoJSON.Polygon>, clip: GeoJSON.Feature<GeoJSON.Polygon>): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Calculates the distance between two points in the specified units. Uses
     * the Haversine formula to account for global curvature.
     */
    export function distance(origin: GeoJSON.Feature<GeoJSON.Point>, destination: GeoJSON.Feature<GeoJSON.Point>, units?: Units): number;

    /**
     * Takes any number of features and returns a rectangular polygon that
     * encompasses all vertices.
     */
    export function envelope(input: GeoJSON.FeatureCollection<any>): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Takes a feature or featurecollection and returns all positions as points.
     */
    export function explode(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>): GeoJSON.FeatureCollection<GeoJSON.Point>;

    /**
     * Takes input features and flips all of their coordinates from `[x, y]` to
     * `[x, y]`
     */
    export function flip(input: GeoJSON.Feature<any>): GeoJSON.Feature<any>;
    export function flip(input: GeoJSON.FeatureCollection<any>): GeoJSON.FeatureCollection<any>;

    /**
     * Takes a bounding box and a cell size in `units` and returns a
     * FeatureCollection of flat-topped hexagonal Polygon features aligned in an
     * "odd-q" vertical grid.
     */
    export function hexGrid(bbox: BoundingBox, cellSize: number, units?: Units, triangles?: boolean): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a FeatureCollection of points with known value, a power parameter,
     * a cell depth, a unit of measurement and returns a FeatureCollection of
     * polygons in a square-grid with an interpolated value property "IDW" for
     * each grid cell.
     *
     * It finds application when in need of creating a continuous surface (i.e.
     * rainfall, temperature, chemical dispersion surface...) from a set of
     * spatially scattered points.
     */
    export function idw(controlPoints: GeoJSON.FeatureCollection<GeoJSON.Point>, valueField: string, b: number, cellWidth: number, units?: Units): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a Point and a Polygon or MultiPolygon and determines if the point
     * resides inside the polygon. The polygon can be convex or concave. The
     * function accounts for holes.
     */
    export function inside(point: GeoJSON.Feature<GeoJSON.Point>, polygon: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>): boolean;

    /**
     * Takes two Polygons and finds their intersection. If they share a border,
     * returns the border; if they don't intersect, returns undefined.
     */
    export function intersect(polygon1: GeoJSON.Feature<GeoJSON.Polygon>, polygon2: GeoJSON.Feature<GeoJSON.Polygon>): GeoJSON.Feature<GeoJSON.Polygon> | undefined | GeoJSON.Feature<GeoJSON.MultiLineString>;

    /**
     * Takes Points with z-values and an array of value breaks and generates
     * isolines.
     */
    export function isolines(points: GeoJSON.FeatureCollection<GeoJSON.Point>, z: string, resolution: number, breaks: number[]): GeoJSON.FeatureCollection<GeoJSON.LineString>;

    /**
     * Takes a Polygon and returns Points at all self-intersections.
     */
    export function kinks(polygon: GeoJSON.Feature<GeoJSON.Polygon> | GeoJSON.Polygon): GeoJSON.FeatureCollection<GeoJSON.Point>;

    /**
     * Takes a LineString and measures its length in the specifed units.
     */
    export function lineDistance(line: GeoJSON.Feature<GeoJSON.LineString>, units?: Units): number;

    /**
     * Takes a LineString, a start Point and a stop Point, and returns a
     * subsection of the line in-between those points. The start & stop points
     * don't need to fall exactly on the line.
     */
    export function lineSlice(start: GeoJSON.Feature<GeoJSON.Point>, stop: GeoJSON.Feature<GeoJSON.Point>, line: GeoJSON.Feature<GeoJSON.LineString> | GeoJSON.LineString): GeoJSON.Feature<GeoJSON.LineString>;

    /**
     * Takes a LineString, a specified distance along the line to a start Point,
     * a specifed distance along the line to a stop point and returns a
     * subsection of the line between those points. This can be useful for
     * extracting only the part of a route between two distances.
     */
    export function lineSliceAlong(line: GeoJSON.Feature<GeoJSON.LineString>, startDistance: number, stopDistance: number, units?: Units): GeoJSON.Feature<GeoJSON.LineString>;

    /**
     * Takes two Points and returns a Point midway between them. The midpoint is
     * calculated geodesically, meaning the curvature of the earth is taken into
     * account.
     */
    export function midpoint(from: GeoJSON.Feature<GeoJSON.Point>, to: GeoJSON.Feature<GeoJSON.Point>): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a reference Point and a FeatureCollection of Point Features and
     * returns the point from the FeatureCollection closest to the reference.
     * This calculation is geodesic.
     */
    export function nearest(target: GeoJSON.Feature<GeoJSON.Point>, points: GeoJSON.FeatureCollection<GeoJSON.Point>): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a triangular plane as a Polygon and a Point within that trangle and
     * returns the z-value at that point. The Polygon needs to have properties
     * `a`, `b` and `c` that define the values at its three corners.
     */
    export function planepoint(point: GeoJSON.Feature<GeoJSON.Point>, triangle: GeoJSON.Feature<GeoJSON.Polygon>): number;

    /**
     * Takes a bounding box and a cell depth and returns a set of Points in a
     * grid.
     */
    export function pointGrid(bbox: BoundingBox, cellSize: number, units?: Units): GeoJSON.FeatureCollection<GeoJSON.Point>;

    /**
     * Takes a Point and a LineString and calculates the closest Point on the
     * LineString.
     */
    export function pointOnLine(line: GeoJSON.Feature<GeoJSON.LineString>, point: GeoJSON.Feature<GeoJSON.Point>, units?: Units): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a feature and returns a Point guaranteed to be on the surface
     * of the feature.
     *
     * * Given a Polygon, the point will be in the area of the polygon.
     * * Given a LineString, the point will be along the string.
     * * Given a Point, the point will the same as the input.
     */
    export function pointOnSurface(input: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.LineString | GeoJSON.Point> | GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.LineString | GeoJSON.Point>): GeoJSON.Feature<GeoJSON.Point>;

    interface RandomPointOptions {
        bbox?: BoundingBox;
    }

    interface RandomPolygonOptions {
        num_vertices?: number;
        max_radial_length?: number;
        bbox?: BoundingBox;
    }

    /**
     * Generates random GeoJSON Points.
     */
    export function random(type: "point" | "points", count?: number, options?: RandomPointOptions): GeoJSON.FeatureCollection<GeoJSON.Point>;

    /**
     * Generates random GeoJSON Polygons.
     */
    export function random(type: "polygon" | "polygons", count?: number, options?: RandomPolygonOptions): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a FeatureCollection and returns a FeatureCollection with given
     * number of Features at random.
     */
    export function sample<T extends GeoJSON.GeometryObject | GeoJSON.GeometryCollection>(input: GeoJSON.FeatureCollection<T>, number: number): GeoJSON.FeatureCollection<T>;

    type SimplifiableGeometry = GeoJSON.LineString | GeoJSON.Polygon | GeoJSON.MultiLineString | GeoJSON.MultiPolygon;

    /**
     * Takes a LineString or Polygon and returns a simplified version.
     * Internally uses simplify-js to perform simplification.
     */
    export function simplify<T extends GeoJSON.Feature<SimplifiableGeometry> | GeoJSON.FeatureCollection<SimplifiableGeometry> | GeoJSON.GeometryCollection>(feature: T, tolerance: number, highQuality: boolean): T;

    /**
     * Takes a bounding box and calculates the minimum square bounding box that
     * would contain the input.
     */
    export function square(bbox: BoundingBox): BoundingBox;

    /**
     * Takes a bounding box, a cell depth and returns a set of square Polygons
     * in a grid.
     */
    export function squareGrid(bbox: BoundingBox, cellSize: number, units?: Units): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a set of Points, a set of Polygons and a performs a spatial join.
     */
    export function tag(points: GeoJSON.FeatureCollection<GeoJSON.Point>, polygons: GeoJSON.FeatureCollection<GeoJSON.Polygon>, inField: string, outField: string): GeoJSON.FeatureCollection<GeoJSON.Point>;

    /**
     * Tesselates a Feature<Polygon> into a FeatureCollection<Polygon> of
     * triangles using earcut.
     */
    export function tesselate(polygon: GeoJSON.Feature<GeoJSON.Polygon>): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a set of Points, the name of a z-value property and creates a
     * Triangulated Irregular Network (or TIN for short), returned as a
     * collection of Polygons. These are often used for developing elevation
     * contour maps or stepped heat visualizations.
     *
     * This triangulates the points, and adds properties called `a`, `b`, and
     * `c` representing the value of the given `propertyName` at each of the
     * points that represent the corners of the triangle.
     */
    export function tin(points: GeoJSON.FeatureCollection<GeoJSON.Point>, zProperty?: string): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a bounding box, a cell depth and returns a set of triangular
     * Polygons in a grid.
     */
    export function triangleGrid(bbox: BoundingBox, cellSize: number, units?: Units): GeoJSON.FeatureCollection<GeoJSON.Polygon>;


    /**
     * Takes two or more Polygons and returns a combined Polygon. If the input
     * Polygons are not contiguous, this function returns a MultiPolygon
     * Feature.
     */
    export function union(...polygons: GeoJSON.Feature<GeoJSON.Polygon>[]): GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>;

    /**
     * Takes a set of Pionts, a set of Polygons and returns the Points that fall
     * within the Polygons.
     */
    export function within(points: GeoJSON.FeatureCollection<GeoJSON.Point>, polygons: GeoJSON.FeatureCollection<GeoJSON.Polygon>): GeoJSON.FeatureCollection<GeoJSON.Point>;

    export import feature = helpers.feature;
    export import point = helpers.point;
    export import polygon = helpers.polygon;
    export import lineString = helpers.lineString;
    export import featureCollection = helpers.featureCollection;
    export import multiLineString = helpers.multiLineString;
    export import multiPoint = helpers.multiPoint;
    export import multiPolygon = helpers.multiPolygon;
    export import geometryCollection = helpers.geometryCollection;
}

declare namespace helpers {
    /**
     * Wraps a GeoJSON Geometry in a GeoJSON Feature.
     */
    export function feature(geometry: GeoJSON.GeometryObject, properties?: any): GeoJSON.FeatureCollection<any>;

    /**
     * Takes coordinates, properties and returns a new Point feature.
     */
    export function point(coordinates: GeoJSON.Position, properties?: any): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes an array of LinearRings, properties and returns a Polygon feature.
     */
    export function polygon(coordinates: GeoJSON.Position[][], properties?: any): GeoJSON.Feature<GeoJSON.Polygon>;

    /**
     * Takes a coordinate array, properties and returns a LineString.
     */
    export function lineString(coordinates: GeoJSON.Position[], properties?: any): GeoJSON.Feature<GeoJSON.LineString>;

    /**
     * Takes one or more Features and creates a FeatureCollection.
     */
    export function featureCollection(features: Array<GeoJSON.Feature<any>>): GeoJSON.FeatureCollection<any>;

    /**
     * Takes a coordinate array, properties and returns a MultiLineString
     * Feature.
     */
    export function multiLineString(coordinates: GeoJSON.Position[][], properties?: any): GeoJSON.Feature<GeoJSON.MultiLineString>;

    /**
     * Takes a coordinate array, properties and returns a MultiPoint Feature.
     */
    export function multiPoint(coordinates: GeoJSON.Position[], properties?: any): GeoJSON.Feature<GeoJSON.MultiPoint>;

    /**
     * Takes a coordinate array, properties and returns a MultiPolygon Feature.
     */
    export function multiPolygon(coordinates: GeoJSON.Position[][][], properties?: any): GeoJSON.Feature<GeoJSON.MultiPolygon>;

    /**
     * Takes a coordinate array, properties and returns a GeometryCollection
     * Feature.
     */
    export function geometryCollection(coordinates: Array<GeoJSON.GeometryObject>, properties?: any): GeoJSON.Feature<GeoJSON.GeometryCollection>;

    /**
     * Convert a distance measurement from radians to a more friendly unit.
     */
    export function radiansToDistance(radians: number, units?: turf.Units): number;

    /**
     * Convert a distance measurement from a real-world unit into radians.
     */
    export function distanceToRadians(distance: number, units?: turf.Units): number;

    /**
     * Convert a distance measurement from a real-world unit into degrees
     */
    export function distanceToDegrees(distance: number, units?: turf.Units): number;
}

declare namespace invariant {
    /**
     * Unwrap a coordinate from a Feature with a Point geometry, a Point
     * geometry, or a single coordinate.
     */
    export function getCoord(input: GeoJSON.Feature<GeoJSON.Point> | GeoJSON.Point | GeoJSON.Position): GeoJSON.Position;

    /**
     * Enforce expectations about types of GeoJSON objects.
     */
    export function geojsonType(value: any, type: string, name: string): void;

    /**
     * Enforce expectations about types of Feature inputs.
     */
    export function featureOf(feature: GeoJSON.Feature<any>, type: string, name: string): void;

    /**
     * Enforce expectations about types of FeatureCollection inputs.
     */
    export function collectionOf(featurecollection: GeoJSON.FeatureCollection<any>, type: string, name: string): void;
}

declare namespace meta {
    /**
     * Iterate over coordinates in any GeoJSON object, similar to Array.forEach.
     */
    export function coordEach(object: any, callback: (coord: GeoJSON.Position) => void, excludeWrapCoord: boolean): void;

    /**
     * Reduce coordinates in any GeoJSON object into a single value similar to
     * how Array.reduce works. However, in this case we lazily run the
     * reduction, so an array of all coordinates is unnecessary.
     */
    export function coordReduce<T>(object: any, callback: (memo: T, coord: GeoJSON.Position) => T, memo: T, excludeWrapCoord: boolean): T;

    /**
     * Iterate over property objects in any GeoJSON object, similar to
     * Array.forEach.
     */
    export function propEach(object: any, callback: (properties: any) => void): void;

    /**
     * Reduce properties in any GeoJSON object into a single value similar to
     * how Array.reduce works. However, in this case we lazily run the
     * reduction, so an array of all properties is unnecessary.
     */
    export function propReduce<T>(object: any, callback: (memo: T, prop: any) => T, memo: T): T;

    /**
     * Iterate over features in any GeoJSON object, similar to Array.forEach.
     */
    export function featureEach(object: any, callback: (feature: GeoJSON.Feature<any>) => void): void;

    /**
     * Get all coordinates from any GeoJSNO object, returning an array of
     * coordinate arrays.
     */
    export function coordAll(object: any): GeoJSON.Position[];
}

declare module "turf" {
    export = turf;
}

declare module "@turf/turf" {
    export = turf;
}

declare module "@turf/along" {
    export default turf.along;
}

declare module "@turf/area" {
    export default turf.area;
}

declare module "@turf/bbox" {
    export default turf.bbox;
}

declare module "@turf/bbox-polygon" {
    export default turf.bboxPolygon;
}

declare module "@turf/bearing" {
    export default turf.bearing;
}

declare module "@turf/bezier" {
    export default turf.bezier;
}

declare module "@turf/buffer" {
    export default turf.buffer;
}

declare module "@turf/center" {
    export default turf.center;
}

declare module "@turf/center-of-mass" {
    export default turf.centerOfMass;
}

declare module "@turf/centroid" {
    export default turf.centroid;
}

declare module "@turf/circle" {
    export default turf.circle;
}

declare module "@turf/collect" {
    export default turf.collect;
}

declare module "@turf/combine" {
    export default turf.combine;
}

declare module "@turf/concave" {
    export default turf.concave;
}

declare module "@turf/convex" {
    export default turf.convex;
}

declare module "@turf/difference" {
    export default turf.difference;
}

declare module "@turf/distance" {
    export default turf.distance;
}

declare module "@turf/envelope" {
    export default turf.envelope;
}

declare module "@turf/explode" {
    export default turf.explode;
}

declare module "@turf/flip" {
    export default turf.flip;
}

declare module "@turf/helpers" {
    export = helpers;
}

declare module "@turf/hex-grid" {
    export default turf.hexGrid;
}

declare module "@turf/idw" {
    export default turf.idw;
}

declare module "@turf/inside" {
    export default turf.inside;
}

declare module "@turf/intersect" {
    export default turf.intersect;
}

declare module "@turf/invariant" {
    export = invariant;
}

declare module "@turf/isolines" {
    export default turf.isolines;
}

declare module "@turf/kinks" {
    export default turf.kinks;
}

declare module "@turf/line-distance" {
    export default turf.lineDistance;
}

declare module "@turf/line-slice" {
    export default turf.lineSlice;
}

declare module "@turf/line-slice-along" {
    export default turf.lineSliceAlong;
}

declare module "@turf/meta" {
    export = meta;
}

declare module "@turf/midpoint" {
    export default turf.midpoint;
}

declare module "@turf/nearest" {
    export default turf.nearest;
}

declare module "@turf/planepoint" {
    export default turf.planepoint;
}

declare module "@turf/point-grid" {
    export default turf.pointGrid;
}

declare module "@turf/point-on-line" {
    export default turf.pointOnLine;
}

declare module "@turf/point-on-surface" {
    export default turf.pointOnSurface;
}

declare module "@turf/random" {
    export default turf.random;
}

declare module "@turf/sample" {
    export default turf.sample;
}

declare module "@turf/simplify" {
    export default turf.simplify;
}

declare module "@turf/square" {
    export default turf.square;
}

declare module "@turf/square-grid" {
    export default turf.squareGrid;
}

declare module "@turf/tag" {
    export default turf.tag;
}

declare module "@turf/tesselate" {
    export default turf.tesselate;
}

declare module "@turf/triangle-grid" {
    export default turf.triangleGrid;
}

declare module "@turf/union" {
    export default turf.union;
}

declare module "@turf/within" {
    export default turf.within;
}