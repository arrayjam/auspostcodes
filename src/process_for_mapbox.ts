/// <reference path="../typings/index.d.ts"/>

import * as fs from "fs";
import * as shapefile from "shapefile";

shapefile.read(process.argv[2], (error, postalGeoJSON) => {
  postalGeoJSON.features.forEach(function (feature) {
    let postcode = feature.properties.POA_CODE.slice(3);

    let digits = {
      digit_one: +postcode.slice(0, 1),
      digit_two: +postcode.slice(1, 2),
      digit_three: +postcode.slice(2, 3),
      digit_four: +postcode.slice(3, 4),
      postcode: postcode,
    };

    for (let key in digits) {
      feature.properties[key] = (<any>digits)[key];
    }
  });

  process.stdout.write(JSON.stringify(postalGeoJSON));
});
