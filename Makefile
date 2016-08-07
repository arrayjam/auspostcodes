# ZIP -> geojson -> geojson with digit_* properties
#                                                  -> upload as to mapbox
#                                                  -> calculate bounds.json
# Make sure to remove intermediate shp, geojson files. Just need bounds.json and geojson with digits
all: shp/POA_2011_AUST.shp

clean:
	rm -rf -- shp

shp/POA_2011_AUST.shp:
	unzip originals/2011_POA_shape.zip -d $(dir $@)
	touch $@

