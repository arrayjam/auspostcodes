# ZIP -> geojson -> geojson with digit_* properties
#                                                  -> upload as to mapbox
#                                                  -> calculate bounds.json
# Make sure to remove intermediate shp, geojson files. Just need bounds.json and geojson with digits
all: generated/postal_boundaries_mapbox.geojson

clean:
	rm -rf -- shp generated

shp/POA_2011_AUST.shp:
	unzip originals/2011_POA_shape.zip -d $(dir $@)
	touch $@

# TODO(yuri): Generalise TypeScript compilation?
process_for_mapbox.js: src/process_for_mapbox.ts
	tsc --outDir $(dir $@) $<
	chmod +x $@

generated/postal_boundaries_mapbox.geojson: process_for_mapbox.js shp/POA_2011_AUST.shp
	mkdir -p $(dir $@)
	node process_for_mapbox.js shp/POA_2011_AUST.shp > $@
