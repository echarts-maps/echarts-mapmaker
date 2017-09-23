# echarts-mapmaker

Makes custom geomaps for echarts presentation. It takes a subset of [echarts-map-tool](https://github.com/ecomfe/echarts-map-tool) as core map editing utility.

## Commands

### compress

Compress any un-compressed gejson as js file.

```
Usage: compress [options] <geojson> <js> <mapRegistryName>


Options:

  -h, --help  output usage information
```

where importantly `mapRegistryName` is the name to be called in your echarts script.

Example commands

compress [world.json](https://github.com/ecomfe/echarts/blob/master/map/json/world.json) world.js world

## License

MIT