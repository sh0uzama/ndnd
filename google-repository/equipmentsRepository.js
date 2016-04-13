var _ = require('lodash');
var Promise = require('promise');

var read = require('./spreadsheet');
var utils = require('./utils');

var _equipments = [];

Promise.all([
  read.section('weapons', 10),
  read.section('armors', 2),
  read.section('shields', 2)
]).then(function(res) {
  
  res[0].forEach(function(weapon) {
    const w = utils.mapOne(weapon, ['id', 'name', 'requirements', 'damage', 'd6', 'modifier', 'crit', 'hands', 'range']);
    w.type = 'weapon';
    _equipments.push(w);
  });
  res[1].forEach(function(armor) {
    const a = utils.mapOne(armor, ['id', 'name', 'requirements', 'armor', 'wounds', 'mass', 'move']);
    a.type = 'armor';
    _equipments.push(a);
  });
  res[2].forEach(function(shield) {
    const s = utils.mapOne(shield, ['id', 'name', 'requirements', 'block', 'd6', 'modifier', 'hands']);
    s.type = 'shield';
    _equipments.push(s);
  });
  
  console.log('equipments repository - loaded');
  
});

function getAll() {
  return _equipments;
}

function get(id) {
  return _.find(_equipments, e => e.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};