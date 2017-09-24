const fs = require('fs');
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


module.exports = {
  compress: geoJsonToCompressedJs
}
