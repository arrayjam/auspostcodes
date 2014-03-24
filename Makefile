all: data/combined.topo.json

clean:
	rm -r data sources

sources/POA_2011_AUST.shp: zip/2011_POA_shape.zip
	unzip -o -d sources $^
	touch $@

sources/SSC_2011_AUST.shp: zip/2011_SSC_shape.zip
	unzip -o -d sources $^
	touch $@

sources/STE_2011_AUST.shp: zip/2011_STE_shape.zip
	unzip -o -d sources $^
	touch $@

data/combined.topo.json: data/ sources/POA_2011_AUST.shp sources/SSC_2011_AUST.shp sources/STE_2011_AUST.shp
	topojson --simplify-proportion 0.2 -p postcode=POA_CODE,suburb=SSC_NAME -o $@ -- \
		postcodes=sources/POA_2011_AUST.shp \
		suburbs=sources/SSC_2011_AUST.shp \
		australia=sources/STE_2011_AUST.shp

data/:
	mkdir -p data

