var _ = require('lodash');
var fb = require('../firebase.config');
var textTransformer = require('./textTransformer');

var _perkList = [];

function textToHtml(p) {

  if (p.requirements) {
    p.requirements = textTransformer.textToHtml(p.requirements);
  }

  if (p.effect) {
    p.effect = textTransformer.textToHtml(p.effect);
  }

}

fb.child('perks').once("value", function(data) {

  var value = data.val();

  _perkList = Object.keys(value).map(key => value[key]);
  _perkList.forEach(textToHtml);

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