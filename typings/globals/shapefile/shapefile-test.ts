/// <reference path="./index.d.ts"/>
import * as shapefile from "shapefile";

function isFeatureCollection(record: GeoJSON.Feature<any> | shapefile.End): record is GeoJSON.Feature<any> {
    return (<GeoJSON.Feature<any>>record).properties !== undefined;
}

let reader = shapefile.reader("filename");

reader.readHeader((error, header) => {
    if (error) console.error(error);

    console.log(header);

    let end = shapefile.end;
    read();

    function read() {
        reader.readRecord((error, record) => {
            if (error) console.error(error);

            if (isFeatureCollection(record)) {
                console.log(record.properties.POA_CODE);
                read();
            } else {
                console.log("Found end");
                reader.close(() => {
                    console.log("Closed");
                });
            }
        });
    }
});

shapefile.read("filename", (error, collection) => {
    collection.features.forEach(feature => {
        console.log(feature.type, feature.properties);
    });
});