#! /usr/bin/env node
const fs = require('fs');

var program = require('commander');

program
  .arguments('<geojson> <geojsonToBeMerged>')
  .action(function(geojson, geojsonToBeMerged){
    merge(geojson, geojsonToBeMerged);
  })
  .parse(process.argv);


//geojson对象
function Geojson() {
    this.type  = "FeatureCollection";
    this.features =[];
}


function merge(geojson, geojsonToBeMerged){
  fs.readFile(geojson, 'utf8', function (err, data) {
    if(err)throw err;
    fs.readFile(geojsonToBeMerged, 'utf8', function(err2, data2){
      if(err2) throw err2;
      
      var parent = JSON.parse(data);
      var child = JSON.parse(data2);

      parent.features.push(child.features[0])
      fs.writeFileSync('merged_'+geojson, JSON.stringify(parent));
    });
  })
}         
