function mapOne(row, keys) {

  var result = {};
  keys.forEach(k => result[k] = row[k]);
  return result;
  
}

function map (rows, keys) {
  
  var result = [];
  rows.forEach(r => result.push(mapOne(r, keys)));
  return result;
  
}

module.exports = {
  map: map,
  mapOne: mapOne
};