function map(firebaseObject) {
  
  var result =  Object.keys(firebaseObject).map(key => {
    var result = firebaseObject[key];
    result._id = key;
    return result;
  });
  
  return result;
  
}

module.exports = {
  map: map
};