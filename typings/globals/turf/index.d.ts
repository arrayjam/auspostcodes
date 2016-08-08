/// <reference path="../geojson/index.d.ts"/>

declare module turf {
    type Unit = "miles" | "nauticalmiles" | "degrees" | "radians" | "inches" | "yards" | "meters" | "metres" | "kilometers" | "kilometres";

    /**
     * A bounding box in WSEN order (west, south, east, north)
     */
    type BoundingBox = [number, number, number, number];

    /**
     * Takes a LineString and returns a Point at a specified distance along the line.
     */
    export function along(line: GeoJSON.Feature<GeoJSON.LineString>, distance: number, unit?: Unit): GeoJSON.Feature<GeoJSON.Point>;

    /**
     * Takes a one or more features and returns their area in square meters.
     */
    export function area(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>): number;

    /**
     * Joins attributes FeatureCollection of polygons with a FeatureCollection of
     * points. Given an `inProperty` on points and an `outProperty` for polygons,
     * this finds every point that lies within each polygon, collects the `inProperty`
     * values from those points, and adds them as an array to `outProperty` on the
     * polygon.
     */
    export function collect(polygons: GeoJSON.FeatureCollection<GeoJSON.Polygon>, points: GeoJSON.FeatureCollection<GeoJSON.Point>, inProperty: string, outProperty: string): GeoJSON.FeatureCollection<GeoJSON.Polygon>;

    /**
     * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
     */
    export function bbox(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>): BoundingBox;

    /**
     * Takes a bbox and returns an equivalent {@link Polygon|polygon}.
     */
    export function bboxPolygon(bbox: BoundingBox): GeoJSON.Feature<GeoJSON.Polygon>

    /**
     * Takes two points and finds the geographic bearing between them.
     */
    export function bearing(start: GeoJSON.Feature<GeoJSON.Point>, end: GeoJSON.Feature<GeoJSON.Point>): number;

    /**
     * Takes a linestring and returns a curved version
     */
    export function bezier(input: GeoJSON.Feature<GeoJSON.LineString>, resolution?: number, sharpness?: number): GeoJSON.Feature<GeoJSON.LineString>;

    /**
     * Calculates a buffer for input features for a given radius.
     */
    export function buffer(input: GeoJSON.Feature<any> | GeoJSON.FeatureCollection<any>, distance: number, unit: Unit): GeoJSON.FeatureCollection<GeoJSON.Polygon> | GeoJSON.FeatureCollection<GeoJSON.MultiPolygon> | GeoJSON.Polygon | GeoJSON.MultiPolygon;

    /**
     * Takes a featurecollection and returns the absolute center point of all features.
     */
    export function center(input: GeoJSON.FeatureCollection<any>): GeoJSON.Feature<GeoJSON.Point>;
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

declare module "turf-collect" {
    export default turf.collect;
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