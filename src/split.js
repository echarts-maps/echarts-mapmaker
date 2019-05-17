#! /usr/bin/env node

var program = require('commander');
const maker = require('./maker');

program
  .arguments('<geojson>')
  .action(function(geojson){
    maker.splitAsGeojson(geojson);
  })
  .parse(process.argv);
