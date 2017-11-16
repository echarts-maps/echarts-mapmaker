#! /usr/bin/env node

var program = require('commander');
const maker = require('./maker');

program
  .arguments('<geojson> <output>')
  .action(function(geojson, output){
    maker.compress(geojson, output);
  })
  .parse(process.argv);
