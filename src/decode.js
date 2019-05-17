#! /usr/bin/env node

var program = require('commander');
const  maker = require('./maker');

program
  .arguments('<geojson> <output_geojson>')
  .action(function(js, geojson){
    maker.decode(js, geojson);
  })
  .parse(process.argv);
