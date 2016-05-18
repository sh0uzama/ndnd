var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var objectName = "User";

var schema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  displayname: {
    type: String,
    unique: true
  },
  password: String,
  email: {
    type: String
  },
  googleId: {
    type: String,
    unique: true
  },
  avatar: String
});
schema.plugin(uniqueValidator);

schema.methods.validPassword = function(password) {
  return (password == this.password);
};

module.exports = mongoose.model(objectName, schema);