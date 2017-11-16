#! /usr/bin/env node

var program = require('commander');
const maker = require('./maker');

program
  .arguments('<geojson>')
  .option('-l, --list', 'list all properties in each feature')
  .option('-r, --rename <oldname,newname>', 'rename a property')
  .option('-m, --merge <propertya,propertyb,new property>', 'merge two property')
  .action(function(geojson){
    if(program.list){
      maker.inspect(geojson);
    }else if(program.rename){
      var args = program.rename.split(',');
      var oldname = args[0];
      var newname = args[1];
      maker.rename(geojson, oldname, newname);
    }else if(program.merge){
      var args = program.merge.split(',');
      var propertyA = args[0];
      var propertyB = args[1];
      var newProperty = args[2];
      maker.mergeProperty(geojson, propertyA, propertyB, newProperty);
    }
  })
  .parse(process.argv);
