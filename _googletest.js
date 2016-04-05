// var GoogleSpreadsheet = require("google-spreadsheet");
// var doc = new GoogleSpreadsheet('1SbQOs-OVR8aVj3JUVaXiSJt3ehYQHgT0kWM8Y9fHcSU');

// doc.getInfo(function(err, info) {
//   if (err) {
//     console.error(err);
//   }
//   console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
//   console.log(info);
//   // var sheet = info.worksheets[5];
//   console.log(info.worksheets.length);
//   // sheet.getRows({
//   //   offset: 1,
//   //   limit: 20,
//   //   orderby: 'col2'
//   // }, function(err, rows) {
//   //   if (err) {
//   //     console.error(err);
//   //   }
//   //   console.log(rows);
//   // });
// });

var read = require('./google-repository/spreadsheet');

console.log('here we go');
read.section('status', 20).then(console.log);
