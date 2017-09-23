const fs = require('fs');
const mapTool = require('./map-tool');


var geoJsonToCompressedJs = (jsonFile, jsFile, registryName) => {
  console.log(jsFile);

  fs.readFile(jsonFile, 'utf8', function (err, data) {
    if(err) throw err;

    var geojson = JSON.parse(data);

    mapTool.compress(geojson);
    fs.writeFile(jsFile, mapTool.makeJs(geojson, registryName), function(err){
      if (err) throw err;
    });

  });

};


module.exports = {
  compress: geoJsonToCompressedJs
}
