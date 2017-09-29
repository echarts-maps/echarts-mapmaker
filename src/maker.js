const fs = require('fs');
const os = require('os');
const path = require('path');
const mapTool = require('./map-tool');


var geoJsonToCompressedJs = (jsonFile, jsFile, registryName) => {

  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if(err) throw err;

    var geojson = JSON.parse(data);

    if(!geojson.UTF8Encoding){
      mapTool.compress(geojson);
    }
    fs.writeFile(jsFile, mapTool.makeJs(geojson, registryName), function(err){
      if (err) throw err;
    });

  });

};

var geoJsonListProperties = (jsonFile) => {
  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if(err) throw err;

    var geojson = JSON.parse(data);

    geojson.features.forEach(function (feature){
      console.log(JSON.stringify(feature.properties));
    });

  });
};


var geoJsonRenameAProperty = (jsonFile, oldProperty, newProperty) => {
  var data = fs.readFileSync(jsonFile, 'utf8')
  var geojson = JSON.parse(data);

  geojson.features.forEach(function (feature){
    if(feature.properties[oldProperty]){
      feature.properties[newProperty] = feature.properties[oldProperty];
      delete feature.properties[oldProperty];
    }
  });

  fs.rename(jsonFile, jsonFile + '.backup', function(err){
    if(err)throw err;
    fs.writeFileSync(jsonFile, JSON.stringify(geojson));
  });
};


var geoJsonMergeTwoPropertiesAsOne = (jsonFile, propertyA, propertyB, newProperty) => {
  var data = fs.readFileSync(jsonFile, 'utf8')
  var geojson = JSON.parse(data);

  geojson.features.forEach(function (feature){
    feature.properties[newProperty] = feature.properties[propertyA] + ' ' + feature.properties[propertyB];
    if(feature.properties[propertyA]){
      delete feature.properties[propertyA];
    }
    if(feature.properties[propertyB]){
      delete feature.properties[propertyB];
    }
  });

  fs.rename(jsonFile, jsonFile + '.backup', function(err){
    if(err)throw err;
    fs.writeFileSync(jsonFile, JSON.stringify(geojson));
  });
};


module.exports = {
  compress: geoJsonToCompressedJs,
  inspect: geoJsonListProperties,
  rename: geoJsonRenameAProperty,
  merge: geoJsonMergeTwoPropertiesAsOne
}
