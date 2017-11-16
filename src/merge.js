#! /usr/bin/env node
const fs = require('fs');

var program = require('commander');
const maker = require('./maker');


program
  .arguments('<geojson> <geojsonToBeMerged>')
  .action(function(geojson, geojsonToBeMerged){
    maker.merge(geojson, geojsonToBeMerged);
  })
  .parse(process.argv);
