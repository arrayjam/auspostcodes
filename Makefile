TOPOJSON = node --max_old_space_size=8192 ./node_modules/.bin/topojson

all: postcodes.json

clean:
	rm -rf shp/*

zip/POA_2011_AUST.zip:
	wget -O $@ --continue --progress=bar "http://www.abs.gov.au/AUSSTATS/subscriber.nsf/log?openagent&1270055003_poa_2011_aust_shape.zip&1270.0.55.003&Data%20Cubes&71B4572D909B934ECA2578D40012FE0D&0&July%202011&22.07.2011&Previous"

shp/POA_2011_AUST.shp: zip/POA_2011_AUST.zip
	unzip -d shp/ $^
	touch $@

postcodes.json: shp/POA_2011_AUST.shp
	$(TOPOJSON) --id-property POA_CODE -q 10000 -s 0.5 -o $@ -- postcodes=$^

