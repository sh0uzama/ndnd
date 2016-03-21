var textTransformer = require('./textTransformer');

function textToHtml(obj) {
  if (obj.description) {
    obj.description = textTransformer.textToHtml(obj.description);
  }
}

var _boons = require("../data/effects/boons.json");
var _conditions = require("../data/effects/condis.json");
var _status = require("../data/effects/status.json");

_boons.forEach(textToHtml);
_conditions.forEach(textToHtml);
_status.forEach(textToHtml);

var _all = _boons;
_all.concat(_conditions);
_all.concat(_status);

function getAll() {
  return {
    boons: _boons,
    conditions: _conditions,
    status: _status
  };
}

function get(id) {
  return _all.find(o => o.id === id);
}

module.exports = {
  getAll: getAll,
  get: get
};