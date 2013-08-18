TOPOJSON = node --max_old_space_size=8192 ./node_modules/.bin/topojson

all: postcodes.json

clean:
	rm -rf shp/*

zip/POA_2011_AUST.zip:
	curl 'http://www.censusdata.abs.gov.au/CensusOutput/copsubdatapacks.nsf/All%20docs%20by%20catNo/Boundaries_2011_POA/$$File/2011_POA_shape.zip' > $@

shp/POA_2011_AUST.shp: zip/POA_2011_AUST.zip
	unzip -d shp/ $^
	touch $@

postcodes.json: shp/POA_2011_AUST.shp
	$(TOPOJSON) --id-property POA_CODE -q 10000 -s 0.5 -o $@ -- postcodes=$^

