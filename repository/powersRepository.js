var _ = require('lodash');
var fb = require('../firebase.config');
var utils = require('./utils');

var _powerList = [];


fb.child('powers').once("value", function(data) {

  var value = data.val();
  _powerList = utils.map(value);

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