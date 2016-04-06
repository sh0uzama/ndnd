var Promise = require('promise');
var GoogleSpreadsheet = require("google-spreadsheet");

var _archive = new GoogleSpreadsheet('1SbQOs-OVR8aVj3JUVaXiSJt3ehYQHgT0kWM8Y9fHcSU');
var _info;

var _loadInfo = new Promise(function(resolve, reject) {

  _archive.getInfo(function(err, info) {

    if (err) {
      reject(err);
    }

    _info = info;
    console.log('loaded repository: ' + info.title + ' by ' + info.author.email);
    resolve(info);

  });

});

function getSection(name) {
  return _info.worksheets.find(w => w.title === name);
};

function section(name, rows) {

  return _loadInfo.then(function() {

    var sheet = getSection(name);
    var getRows = Promise.denodeify(sheet.getRows);
    return getRows({
      offset: 1,
      limit: rows
    });

  });

};

module.exports = {
  section: section
};