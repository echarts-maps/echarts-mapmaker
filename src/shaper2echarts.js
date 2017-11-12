#! /usr/bin/env node
const fs = require('fs');

var program = require('commander');

program
  .arguments('<geojson> <geojson4echarts> <name>')
  .action(function(geojson, geojson4echarts, name){
    transform(geojson, geojson4echarts, name);
  })
  .parse(process.argv);


//geojson对象
function Geojson() {
    this.type  = "FeatureCollection";
    this.features =[];
}


function transform(geojson, geojson4echarts, mapName){
  fs.readFile(geojson, 'utf8', function (err, data) {
    if(err)throw err;
    var shaper = JSON.parse(data);
    var echartsJson = new Geojson();
    echartsJson.features = [
      {
        "type": "Feature",
        "properties": {
          "name": mapName
        },
        "geometry": shaper.geometries[0]
      }
    ];

    fs.writeFileSync(geojson4echarts, JSON.stringify(echartsJson));
  })
}         
