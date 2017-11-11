#! /usr/bin/env node

var program = require('commander');
const  maker = require('./maker');

program
  .arguments('<js> <geojson>')
  .action(function(js, geojson){
    maker.decompress(js, geojson);
  })
  .parse(process.argv);
