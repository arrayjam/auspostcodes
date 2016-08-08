/// <reference path="../geojson/index.d.ts"/>

declare module turf {
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
}

declare module "turf" {
    export = turf;
}

declare module "turf-along" {
    export default turf.along;
}

declare module "turf-area" {
    export default turf.area;
}

declare module "turf-bbox" {
    export default turf.bbox;
}

declare module "turf-bbox-polygon" {
    export default turf.bboxPolygon;
}

declare module "turf-bearing" {
    export default turf.bearing;
}

declare module "turf-bezier" {
    export default turf.bezier;
}

declare module "turf-buffer" {
    export default turf.buffer;
}

declare module "turf-center" {
    export default turf.center;
}

declare module "turf-center-of-mass" {
    export default turf.centerOfMass;
}

declare module "turf-centroid" {
    export default turf.centroid;
}

declare module "turf-circle" {
    export default turf.circle;
}

declare module "turf-collect" {
    export default turf.collect;
}

declare module "turf-combine" {
    export default turf.combine;
}

declare module "turf-concave" {
    export default turf.concave;
}

declare module "turf-convex" {
    export default turf.convex;
}

declare module "turf-difference" {
    export default turf.difference;
}
