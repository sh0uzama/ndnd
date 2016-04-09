var mongoose = require('mongoose');
var mconfig = require('../mongo.config');

var initialize = function(expressApp) {

  expressApp.use(function(req, res, next) {

    res.mjson = function(err, result) {
      if (err) {
        res.status(500).send(err);
      }
      else {
        res.json(result);
      }
    };

    next();

  });

  mongoose.connect(mconfig.connectionString);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function(callback) {
    console.log("connection to mongo open");
  });

};

module.exports = {
  initialize: initialize
};