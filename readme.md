# echarts-mapmaker

Makes custom geomaps for echarts presentation. It takes a subset of [echarts-map-tool](https://github.com/ecomfe/echarts-map-tool) as core map editing utility.

## Commands

### makejs

Compress any un-compressed geojson as js file.

```
Usage: makejs [options] <geojson> <js> <mapRegistryName>


Options:

  -h, --help  output usage information
```

where importantly `mapRegistryName` is the name to be called in your echarts script.

Example commands

makejs [world.json](https://github.com/ecomfe/echarts/blob/master/map/json/world.json) world.js world

### compress

Compress any un-compressed geojson as js file.

```
Usage: compress [options] <geojson> <output>


Options:

  -h, --help  output usage information
```

Example commands

compress [world.json](https://github.com/ecomfe/echarts/blob/master/map/json/world.json) world.json

### decompress

Decompress any compressed js file back to geojson

```

Usage: decompress <js> <geojson>

Options:

  -h, --help  output usage information
```


### property

Manage the property of a geojson file.

```
Usage: property [options] <geojson>


Options:

  -l, --list                                      list all properties in each feature
  -r, --rename <oldname,newname>                  rename a property
  -m, --merge <propertya,propertyb,new property>  merge two property
  -h, --help                                      output usage information
```

### merge

Merge second geojson into the first file.

```
Usage: merge [options] <geojson> <geojsonToBeMerged>


Options:

  -h, --help  output usage information
```

### split

Split the geojson into individual independent geojson files

```
Usage: split [options] <geojson>


Options:

  -h, --help  output usage information
```

### shaper2echarts

Convert [mapshaper](https://github.com/mbloch/mapshaper) dissovled geojson files into echarts map file.

```
Usage: shaper2echarts [options] <geojson> <geojson4echarts> <name>


Options:

  -h, --help  output usage information
```

## License

MIT

## Credit

1. compress.js comes from echarts-map-tool.
1. parseGeoJson.js comes from echarts.js.