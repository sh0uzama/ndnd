var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
var ObjectId = mongoose.Schema.Types.ObjectId;

var objectName = "Hero";

var schema = mongoose.Schema({
  userId: ObjectId,
  name: String,
  primarySpec: String,
  secondarySpec: String,
  avatar: String,
  energy: String,
  attributes: {
    strength: Number,
    agility: Number,
    willpower: Number,
    toughness: Number
  },
  skills: {
    arcana: Number,
    athletics: Number,
    lore: Number,
    perception: Number,
    stealth: Number,
    survival: Number,
    thievery: Number,
    wits: Number
  },
  powers: [String],
  perks: [String],
  armor: String,
  wieldables: [String]
});
// schema.plugin(uniqueValidator);

// schema.methods.validPassword = function(password) {
//   return (password == this.password);
// };

module.exports = mongoose.model(objectName, schema);