var express = require('express');
var router = express.Router();

var repo = require('../repository/powersRepository');

var jsonSchema = {
  "type": "object",
  "title": "Perk",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "id": {
      "title": "Perk ID",
      "type": "string",
      "pattern": "^[a-z0-9\\-]+$"
    },
    "effect": {
      "title": "Description",
      "type": "string"
    }
  },
  "required": ["name", "id", "effect"]
};

var jsonForm = [
  "name",
  "id", {
    key: "effect",
    type: "textarea",
    placeholder: "perk effect"
  },
];

router.get('/', function(req, res) {
  
  res.json(repo.getAll());
  
});

router.get('/_meta', function(req, res) {
  res.json({
    schema: jsonSchema,
    form: jsonForm
  });
});

router.get('/:id', function(req, res) {
  
  var result = repo.get(req.params.id);

  if (!result) {
    res.status(404).end();
    return;
  }
  
  res.json(result);
  
});

module.exports = router;