Postcode explorer for Australia

url for geo: http://www.censusdata.abs.gov.au/CensusOutput/copsubdatapacks.nsf/All%20docs%20by%20catNo/Boundaries_2011_SSC/$File/2011_SSC_shape.zip

command for geoJSON: ogr2ogr -f GeoJSON postcodes.json POA_2011_AUST.shp
topojson --quantization 100000 -s 10e-9 --id-property POA_CODE -o postcodes3.json postcodesgeo.json
