/// <reference path="../geojson/index.d.ts"/>

declare namespace shapefile {
  interface ReaderOptions {
    encoding?: string;
    "ignore-properties"?: boolean;
  }

  export function read(filename: string, callback: (error: Error, collection: GeoJSON.FeatureCollection<any>) => void): void;
  export function read(filename: string, options: ReaderOptions, callback: (error: Error, collection: GeoJSON.FeatureCollection<any>) => void): void;

  export function reader(filename: string, options?: ReaderOptions): Reader;

  export type End = Object;
  export var end: End;

  interface Reader {
    readHeader(callback: (error: Error, header: Header) => void): void;
    readRecord(callback: (error: Error, record: GeoJSON.Feature<any> | End) => void): void;
    close(callback?: Function): void;
  }

  interface Header {
    bbox: [number, number, number, number];
  }
}

declare module "shapefile" {
  export = shapefile;
}

// NOTE: There are two additional private APIs that have the same function interface as Reader, but the types of Header and Record are different, as they return parsed shp and dbf records/data.
// declare module "shapefile/dbf" {
// declare module "shapefile/shp" {