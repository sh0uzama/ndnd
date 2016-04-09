var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var ObjectId = mongoose.Schema.Types.ObjectId;

var objectName = "Hero";

var schema = mongoose.Schema({
  userId: ObjectId,
  name: String,
  primaryClass: String,
  secondaryClass: String,
  avatar: String,
  powers: [String],
  perks: [String]
});
// schema.plugin(uniqueValidator);

// schema.methods.validPassword = function(password) {
//   return (password == this.password);
// };

module.exports = mongoose.model(objectName, schema);