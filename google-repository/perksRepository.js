var _ = require('lodash');
var read = require('./spreadsheet');
var utils = require('./utils');

var _perkList = [];

read.section('perks', 39).then(function(rows) {
  _perkList = utils.map(rows, ['id', 'name', 'effect']);
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