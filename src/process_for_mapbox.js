/// <reference path="../typings/index.d.ts"/>
"use strict";
var shapefile = require("shapefile");
shapefile.read(process.argv[2], function (error, postalGeoJSON) {
    postalGeoJSON.features.forEach(function (feature) {
        var postcode = feature.properties.POA_CODE.slice(3);
        var digits = {
            digit_one: +postcode.slice(0, 1),
            digit_two: +postcode.slice(1, 2),
            digit_three: +postcode.slice(2, 3),
            digit_four: +postcode.slice(3, 4),
            postcode: postcode
        };
        for (var key in digits) {
            feature.properties[key] = digits[key];
        }
    });
    process.stdout.write(JSON.stringify(postalGeoJSON));
});
