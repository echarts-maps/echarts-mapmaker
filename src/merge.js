#! /usr/bin/env node
const fs = require('fs');

var program = require('commander');

program
  .arguments('<geojson> <geojsonToBeMerged>')
  .action(function(geojson, geojsonToBeMerged){
    merge(geojson, geojsonToBeMerged);
  })
  .parse(process.argv);
