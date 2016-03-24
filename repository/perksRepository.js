var _ = require('underscore');
var textTransformer = require('./textTransformer');

var perkList = [];

function textToHtml(p) {

  if (p.requirements) {
    p.requirements = textTransformer.textToHtml(p.requirements);
  }

  if (p.effect) {
    p.effect = textTransformer.textToHtml(p.effect);
  }

}

perkList = require("../data/perks/perks.json");
perkList.forEach(textToHtml);

function getAll() {
  return perkList;
}

function get(id) {
  return _.find(perkList, e => e.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};