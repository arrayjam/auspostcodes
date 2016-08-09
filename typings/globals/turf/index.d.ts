/// <reference path="../geojson/index.d.ts"/>

declare namespace turf {
    type Unit = "miles" | "nauticalmiles" | "degrees" | "radians" | "inches" | "yards" | "meters" | "metres" | "kilometers" | "kilometres";

    /**
     * A bounding box in WSEN order. (west, south, east, north)
     */
    type BoundingBox = [number, number, number, number];

    /**
     * Takes a linestring and returns a Point at a specified distance along the
     * line.
     */
    export function along(line: GeoJSON.Feature<GeoJSON.LineString>, distance: number, unit?: Unit): GeoJSON.Feature<GeoJSON.Point>;

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
    export function buffer(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>, distance: number, unit: Unit): GeoJSON.FeatureCollection<GeoJSON.Polygon> | GeoJSON.FeatureCollection<GeoJSON.MultiPolygon> | GeoJSON.Polygon | GeoJSON.MultiPolygon;

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
    export function circle(point: GeoJSON.Feature<GeoJSON.Point>, radius: number, steps: number, unit?: Unit): GeoJSON.Feature<GeoJSON.Polygon>;

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
    export function concave(points: GeoJSON.FeatureCollection<GeoJSON.Point>, maxEdge: number, unit: Unit): GeoJSON.Feature<GeoJSON.Polygon>;

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
    export function distance(origin: GeoJSON.Feature<GeoJSON.Point>, destination: GeoJSON.Feature<GeoJSON.Point>, unit?: Unit): number;

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
    export function radiansToDistance(radians: number, unit?: Unit): number;

    /**
     * Convert a distance measurement from a real-world unit into radians.
     */
    export function distanceToRadians(distance: number, unit?: Unit): number;

    /**
     * Convert a distance measurement from a real-world unit into degrees
     */
    export function distanceToDegrees(distance: number, unit?: Unit): number;

    /**
     * Takes a bounding box and a cell size in `units` and returns a
     * FeatureCollection of flat-topped hexagonal Polygon features aligned in an
     * "odd-q" vertical grid.
     */
    export function hexGrid(bbox: BoundingBox, cellSize: number, unit: Unit, triangles: boolean): GeoJSON.FeatureCollection<GeoJSON.Polygon>;


    /**
     *
     * Takes a FeatureCollection of points with known value, a power parameter,
     * a cell depth, a unit of measurement and returns a FeatureCollection of
     * polygons in a square-grid with an interpolated value property "IDW" for
     * each grid cell.
     *
     * It finds application when in need of creating a continuous surface (i.e.
     * rainfall, temperature, chemical dispersion surface...) from a set of
     * spatially scattered points.
     */
    export function idw(controlPoints: GeoJSON.FeatureCollection<GeoJSON.Point>, valueField: string, b: number, cellWidth: number, unit: Unit): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

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

// TODO(yuri): Fix this. Question asked on StackOverflow: http://stackoverflow.c
// om/questions/38843426/exporting-namespaces-in-ambient-declarations-while-refe
// rencing-other-namespaces

// Currently the usage is: import helpers = require("@turf/helpers"); const {
// feature } = helpers;
declare module "@turf/helpers" {
    export = {
        feature: turf.feature,
        point: turf.point,
        polygon: turf.polygon,
        lineString: turf.lineString,
        featureCollection: turf.featureCollection,
        multiLineString: turf.multiLineString,
        multiPoint: turf.multiPoint,
        multiPolygon: turf.multiPolygon,
        geometryCollection: turf.geometryCollection,
        radiansToDistance: turf.radiansToDistance,
        distanceToRadians: turf.distanceToRadians,
        distanceToDegrees: turf.distanceToDegrees,
    }
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

declare module "@turf/invariant" {
    export = invariant;
}

declare module "@turf/isolines" {
    export default turf.isolines;
}

declare module "@turf/kinks" {
    export default turf.kinks;
}