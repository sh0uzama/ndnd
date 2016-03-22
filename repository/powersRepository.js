var _ = require('underscore');
var textTransformer = require('./textTransformer');

var powerList = [];

function textToHtml(power) {

  if (power.requirements) {
    power.requirements = textTransformer.textToHtml(power.requirements);
  }

  if (power.effect) {
    power.effect = textTransformer.textToHtml(power.effect);
  }

}

powerList = powerList.concat(require("../data/powers/_base.json"));
powerList = powerList.concat(require("../data/powers/arms.json"));
powerList = powerList.concat(require("../data/powers/elemental-magic.json"));
powerList = powerList.concat(require("../data/powers/shadow-arts.json"));

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