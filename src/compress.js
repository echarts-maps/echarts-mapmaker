#! /usr/bin/env node

var program = require('commander');
const maker = require('./maker');

program
  .arguments('<geojson> <js> <mapRegistryName>')
  .action(function(geojson, js, mapRegistryName){
    maker.compress(geojson, js, mapRegistryName);
  })
  .parse(process.argv);
