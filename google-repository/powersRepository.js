var _ = require('lodash');
var Promise = require('promise');

var read = require('./spreadsheet');
var utils = require('./utils');

var _powerList = [];

Promise.all([
  read.section('core', 20),
  read.section('arms', 12),
  read.section('shadow-arts', 12),
  read.section('elemental-magic', 12)
]).then(function(res) {
  
  res.forEach(function(rows) {
    var powers = utils.map(rows, ['id', 'name', 'action', 'type', 'requirements', 'energy', 'upkeep', 'target', 'effect', 'source']);
    _powerList = _powerList.concat(powers);
  });
  
});

function getAll() {
  return _powerList;
}

function get(id) {
  return _.find(_powerList, e => e.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};