var _ = require('lodash');
var fb = require('../firebase.config');
var utils = require('./utils');

var _perkList = [];

fb.child('perks').once("value", function(data) {

  var value = data.val();
  _perkList = utils.map(value);

});

function getAll() {
  return _perkList;
}

function get(id) {
  return _.find(_perkList, e => e.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};