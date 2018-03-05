#! /usr/bin/env node
const fs = require('fs');
const maker = require('./maker');
var program = require('commander');

program
  .arguments('<geojson> <geojson4echarts> <name>')
  .action(function(geojson, geojson4echarts, name){
    maker.transform(geojson, geojson4echarts, name);
  })
  .parse(process.argv);
