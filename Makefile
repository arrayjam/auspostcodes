TOPOJSON = node --max_old_space_size=8192 ./node_modules/.bin/topojson

DIRS = zip shp data

all: node_modules data/combined.json

clean:
	rm -rf shp data

node_modules:
	npm install

$(DIRS):
	-mkdir $(DIRS)

zip/POA_2011_AUST.zip: zip/
	curl 'http://www.censusdata.abs.gov.au/CensusOutput/copsubdatapacks.nsf/All%20docs%20by%20catNo/Boundaries_2011_POA/$$File/2011_POA_shape.zip' > $@

zip/SSC_2011_AUST.zip: zip/
	curl 'http://www.censusdata.abs.gov.au/CensusOutput/copsubdatapacks.nsf/All%20docs%20by%20catNo/Boundaries_2011_SSC/$$File/2011_SSC_shape.zip' > $@

shp/POA_2011_AUST.shp: shp/ zip/POA_2011_AUST.zip
	unzip -d shp/ zip/POA_2011_AUST.zip
	rm shp/Metadata*
	touch shp/*

shp/SSC_2011_AUST.shp: shp/ zip/SSC_2011_AUST.zip
	unzip -d shp/ zip/SSC_2011_AUST.zip
	rm shp/Metadata*
	touch shp/*

data/combined.json: data/ shp/POA_2011_AUST.shp shp/SSC_2011_AUST.shp
	$(TOPOJSON) --id-property POA_CODE \
		--projection 'd3.geo.albers().rotate([-132.5, 0]).center([0, -26.5]).parallels([-36, -18])' \
		-q 40000 \
		-s 0.000816327 \
		-o $@ -- \
		postcodes=shp/POA_2011_AUST.shp \
		suburbs=shp/SSC_2011_AUST.shp

