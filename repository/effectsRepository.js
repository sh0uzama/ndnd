var fb = require('../firebase.config');
var utils = require('./utils');

var _all = [],
  _boons = [],
  _conditions = [],
  _status = [];

fb.child('effects').once("value", function(data) {

  var value = data.val();
  
  _all = utils.map(value);
  
  _boons = _all.filter(e => e.type === 'boon');
  _conditions = _all.filter(e => e.type === 'condition');
  _status = _all.filter(e => e.type === 'status');

});

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