var _ = require('underscore');
var textTransformer = require('./textTransformer');

var powerList = [];

function flagWithSource(jsonFile, source) {
  var arr = require(jsonFile);
  arr.forEach(e => e.source = source);
  return arr;
}

function textToHtml(power) {

  if (power.requirements) {
    power.requirements = textTransformer.textToHtml(power.requirements);
  }

  if (power.effect) {
    power.effect = textTransformer.textToHtml(power.effect);
  }

}

powerList = powerList.concat(flagWithSource("../data/powers/_base.json", "base"));
powerList = powerList.concat(flagWithSource("../data/powers/arms.json", "arms"));
powerList = powerList.concat(flagWithSource("../data/powers/elemental-magic.json", "elemental-magic"));
powerList = powerList.concat(flagWithSource("../data/powers/shadow-arts.json", "shadow-arts"));

powerList.forEach(textToHtml);

function getAll() {
  return powerList;
}

function get(id) {
  return _.find(powerList, e => e.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};