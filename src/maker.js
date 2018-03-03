const fs = require('fs');
const os = require('os');
const path = require('path');
const mapTool = require('./map-tool');
const parser = require('./parseGeoJson');

var removeAFeature = (jsonFile, featureName) => {

  data = fs.readFileSync(jsonFile, 'utf8');

  var geojson = JSON.parse(data);
  geojson.features = geojson.features.filter((feature)=>{
    return feature.properties.name !== featureName;
  });

  fs.writeFileSync("removed_"+jsFile, JSON.stringify(geojson));

};

var cutAHoleInFeatureAWithFB = (jsonFile, featureA, featureB) => {

  data = fs.readFileSync(jsonFile, 'utf8');

  var geojson = JSON.parse(data);
  var featurea = geojson.features.find(feature => feature.properties.name === featureA);
  var featureb = geojson.features.find(feature => feature.properties.name === featureB);
  // https://stackoverflow.com/questions/43645172/geojson-multipolygon-with-multiple-holes
  featurea.geometry.coordinates.push(featureb.geometry.coordinates[0]);

  fs.writeFileSync("cut_" + jsonFile, JSON.stringify(geojson));
};

var geoJsonToCompressed = (jsonFile, jsFile, registryName) => {

  data = fs.readFileSync(jsonFile, 'utf8');

  var geojson = JSON.parse(data);

  if(!geojson.UTF8Encoding){
    mapTool.compress(geojson);
  }
  fs.writeFileSync(jsFile, JSON.stringify(geojson));

};

var geoJsonToCompressedJs = (jsonFile, jsFile, registryName) => {

  data = fs.readFileSync(jsonFile, 'utf8');

  var geojson = JSON.parse(data);

  if(!geojson.UTF8Encoding){
    mapTool.compress(geojson);
  }
  fs.writeFileSync(jsFile, mapTool.makeJs(geojson, registryName))

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

function jsToGeoJson(jsFile, outputGeoJsonFile){
  data = fs.readFileSync(jsFile, 'utf8');
  const regx = /registerMap\(\".*?\"\,/;
  const suffix = ");}));";
  var tokens = data.split(regx);
  var geojson;
  if(tokens.length !== 2){
    try{
      geojson = JSON.parse(data);
      geojson = parser.decode(geojson);
    }catch(e){
      throw new Error('Invalid js file.')
    }
  }else{
    const heading = tokens[0];
    var jsContent = tokens[1];
    if(heading.indexOf('!function(') !== -1){
      const endregx = /\)\:/;
      var subtokens = jsContent.split(endregx);
      jsContent = subtokens[0];
    }else{
      throw new Error('Cannot handle js file');
    }

    eval('var encodedGeoJson=' + jsContent+';');
    geojson = parser.decode(encodedGeoJson)
  }
  fs.writeFileSync(outputGeoJsonFile, JSON.stringify(geojson));
}

function merge(geojson, geojsonToBeMerged){
  const data = fs.readFileSync(geojson, 'utf8');
  const data2 = fs.readFileSync(geojsonToBeMerged, 'utf8');
  var parent = JSON.parse(data);
  var child = JSON.parse(data2);

  child.features.forEach(function(feature){
    parent.features = parent.features.filter((featurex)=>{
      return featurex.properties.name!==feature.properties.name;
    });
    parent.features.push(feature);
  });
  fs.writeFileSync('merged_'+path.basename(geojson), JSON.stringify(parent));
}         


module.exports = {
  compress: geoJsonToCompressed,
  inspect: geoJsonListProperties,
  rename: geoJsonRenameAProperty,
  mergeProperty: geoJsonMergeTwoPropertiesAsOne,
  merge: merge,
  decompress: jsToGeoJson,
  makeJs: geoJsonToCompressedJs,
  remove: removeAFeature,
  cut: cutAHoleInFeatureAWithFB
}
