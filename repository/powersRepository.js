var _ = require('lodash');
var fb = require('../firebase.config');
var textTransformer = require('./textTransformer');

var _powerList = [];

function textToHtml(power) {

  if (power.requirements) {
    power.requirements = textTransformer.textToHtml(power.requirements);
  }

  if (power.effect) {
    power.effect = textTransformer.textToHtml(power.effect);
  }

}

fb.child('powers').once("value", function(data) {

  var value = data.val();

  _powerList = Object.keys(value).map(key => value[key]);
  _powerList.forEach(textToHtml);

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