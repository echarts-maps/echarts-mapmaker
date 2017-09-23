#! /usr/bin/env node

var program = require('commander');
const maker = require('./maker');

console.log('a');

program
  .arguments('<geojson> <js> <mapRegistryName>')
  .action(function(geojson, js, mapRegistryName){
    maker.compress(geojson, js, mapRegistryName);
  })
  .parse(process.argv);
