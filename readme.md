# echarts-mapmaker

Makes custom geomaps for echarts presentation. It takes a subset of [echarts-map-tool](https://github.com/ecomfe/echarts-map-tool) as core map editing utility.

## Commands

### compress

Compress any un-compressed geojson as js file.

```
Usage: compress [options] <geojson> <js> <mapRegistryName>


Options:

  -h, --help  output usage information
```

where importantly `mapRegistryName` is the name to be called in your echarts script.

Example commands

compress [world.json](https://github.com/ecomfe/echarts/blob/master/map/json/world.json) world.js world

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

## License

MIT

## Credit

1. compress.js comes from echarts-map-tool.
1. parseGeoJson.js comes from echarts.js.