var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

var objectName = "Sheet";

var schema = mongoose.Schema({
  userId: ObjectId,
  heroId: ObjectId,
  wounds: Number,
  permanentWounds: Number,
  armor: Number,
  movement: Number,
  energy: Number,
  inTurn: Boolean,
  hasInstant: Boolean,
  effects: Mixed
});
// schema.plugin(uniqueValidator);

// schema.methods.validPassword = function(password) {
//   return (password == this.password);
// };

module.exports = mongoose.model(objectName, schema);